/* eslint-env node */
import fs from 'fs';
import path from 'path';
import process from 'process';
import { pathToFileURL } from 'url';

const supportsColor = process.stdout.isTTY;
const color = (open, close) => s => (supportsColor ? `\u001b[${open}m${s}\u001b[${close}m` : s);
const bold = color('1', '22');
const dim = color('2', '22');
const cyan = color('36', '39');
const magenta = color('35', '39');
const green = color('32', '39');
const yellow = color('33', '39');
const gray = color('90', '39');
const underline = color('4', '24');
const invert = color('7', '27');

// Configuration mapping for each source variant
const VARIANTS = [
  {
    key: 'content',
    root: 'src/content',
    publicDir: 'public/default/src/content',
    lang: 'JS',
    style: 'CSS',
    exts: ['.jsx']
  },
  {
    key: 'tailwind',
    root: 'src/tailwind',
    publicDir: 'public/tailwind/src/tailwind',
    lang: 'JS',
    style: 'TW',
    exts: ['.jsx']
  },
  {
    key: 'ts-default',
    root: 'src/ts-default',
    publicDir: 'public/ts/default/src/ts-default',
    lang: 'TS',
    style: 'CSS',
    exts: ['.tsx']
  },
  {
    key: 'ts-tailwind',
    root: 'src/ts-tailwind',
    publicDir: 'public/ts/tailwind/src/ts-tailwind',
    lang: 'TS',
    style: 'TW',
    exts: ['.tsx']
  }
];

const REGISTRY_PATH = path.join(process.cwd(), 'registry.json');
const PUBLIC_REGISTRY_PATH = path.join(process.cwd(), 'public', 'r', 'registry.json');
const PACKAGE_JSON_PATH = path.join(process.cwd(), 'package.json');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// Load dependency names from package.json for validation
const pkg = readJSON(PACKAGE_JSON_PATH);

let componentMetadata = {};
try {
  const metadataPath = path.join(process.cwd(), 'src/constants/Information.js');
  if (fs.existsSync(metadataPath)) {
    const mod = await import(pathToFileURL(metadataPath).href + '?t=' + Date.now());
    componentMetadata = mod.componentMetadata || mod.default || {};
  }
} catch (e) {
  // ignore
}

const packageDeps = new Set([...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})]);

// Exclusions (never list as dependencies)
const EXCLUDE_DEPS = new Set(['react', 'react-dom', 'react-icons']);

const metadataKeyLowerSet = new Set(Object.keys(componentMetadata || {}).map(k => k.toLowerCase()));
function getMetaForKey(manualKey, comp) {
  let meta = componentMetadata?.[manualKey] || componentMetadata?.[comp];
  if (meta) return meta;
  const target = (manualKey || '').toLowerCase();
  const foundKey = Object.keys(componentMetadata || {}).find(k => k.toLowerCase() === target);
  return foundKey ? componentMetadata[foundKey] : undefined;
}

function getPackageName(spec) {
  if (spec.startsWith('@')) {
    const parts = spec.split('/');
    return parts.length >= 2 ? parts.slice(0, 2).join('/') : spec;
  }
  return spec.split('/')[0];
}

function extractDependencies(fileContent) {
  const deps = new Set();
  const importRegex =
    /import\s+(?:[^'"`]+?from\s+)?["'`]([^"'`]+)["'`];?|require\(\s*["'`]([^"'`]+)["'`]\s*\)|import\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
  let m;
  while ((m = importRegex.exec(fileContent))) {
    const spec = m[1] || m[2] || m[3];
    if (!spec) continue;
    if (spec.startsWith('.') || spec.startsWith('/') || spec.startsWith('#')) continue; // local/fragment

    const base = getPackageName(spec);
    if (packageDeps.has(base) && !EXCLUDE_DEPS.has(base)) {
      deps.add(base);
    }
  }
  return Array.from(deps).sort();
}

function extractDescription(fileContent) {
  const trimmed = fileContent.trimStart();
  let desc = '';
  const blockMatch = trimmed.match(/^\/\*\*([\s\S]*?)\*\//);
  if (blockMatch) {
    desc = blockMatch[1]
      .split('\n')
      .map(l => l.replace(/^\s*\*\s?/, '').trim())
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  } else {
    const lines = trimmed.split('\n');
    const commentLines = [];
    for (const line of lines) {
      if (/^\s*\/\//.test(line)) commentLines.push(line.replace(/^\s*\/\//, '').trim());
      else if (/^\s*import\b/.test(line) || line.trim() === '') continue;
      else break;
    }
    if (commentLines.length) {
      desc = commentLines.join(' ').replace(/\s+/g, ' ').trim();
    }
  }

  if (desc.includes('.')) {
    const firstSentence = desc.split(/\.(?:\s|$)/)[0];
    desc = firstSentence.trim() + (firstSentence.endsWith('.') ? '' : '.');
  }

  return desc;
}

function findPrimaryFile(dirPath, exts) {
  const baseName = path.basename(dirPath);
  for (const ext of exts) {
    const candidate = path.join(dirPath, baseName + ext);
    if (fs.existsSync(candidate)) return candidate;
  }
  if (fs.existsSync(dirPath)) {
    const entries = fs.readdirSync(dirPath);
    for (const entry of entries) {
      if (exts.some(e => entry.endsWith(e))) return path.join(dirPath, entry);
    }
  }
  return null;
}

function buildItems() {
  const items = [];
  const descriptionCache = new Map();
  const categoryComponentSet = new Map();

  for (const variant of VARIANTS) {
    const absRoot = path.join(process.cwd(), variant.root);
    if (!fs.existsSync(absRoot)) continue;
    const categories = fs.readdirSync(absRoot).filter(f => fs.statSync(path.join(absRoot, f)).isDirectory());
    for (const category of categories) {
      const categoryDir = path.join(absRoot, category);
      const componentDirs = fs
        .readdirSync(categoryDir)
        .filter(f => fs.statSync(path.join(categoryDir, f)).isDirectory());
      for (const comp of componentDirs) {
        const compDir = path.join(categoryDir, comp);
        const primary = findPrimaryFile(compDir, variant.exts);
        if (!primary) continue; // skip if no primary file

        // Track unique component per category
        if (!categoryComponentSet.has(category)) categoryComponentSet.set(category, new Set());
        categoryComponentSet.get(category).add(comp);

        const compKey = `${category}/${comp}`;
        let description = descriptionCache.get(compKey);
        if (!description) {
          const manualKey = `${category}/${comp}`;
          const meta = getMetaForKey(manualKey, comp);
          if (meta) {
            description = meta.description;
          } else {
            try {
              const content = fs.readFileSync(primary, 'utf8');
              description = extractDescription(content) || '';
            } catch (e) {
              /* ignore read error */
            }
          }
          if (description) descriptionCache.set(compKey, description);
        }
        let dependencies = [];
        try {
          const content = fs.readFileSync(primary, 'utf8');
          dependencies = extractDependencies(content);
        } catch (e) {
          /* ignore dep parse error */
        }

        const isTailwind = variant.style === 'TW';
        const relComponentPath = path.relative(path.join(process.cwd(), variant.root), primary); // e.g. Animations/Thing/Thing.jsx
        const publicPath = path.join(variant.publicDir, relComponentPath).replace(/\\/g, '/');

        const files = [
          {
            path: publicPath,
            type: 'registry:component'
          }
        ];

        if (!isTailwind) {
          // Add CSS if exists alongside component (same basename)
          const baseName = path.basename(primary, path.extname(primary));
          const cssPath = path.join(path.dirname(primary), baseName + '.css');
          if (fs.existsSync(cssPath)) {
            const relCss = path.relative(path.join(process.cwd(), variant.root), cssPath);
            const publicCss = path.join(variant.publicDir, relCss).replace(/\\/g, '/');
            files.push({ path: publicCss, type: 'registry:item' });
          }
        }

        const name = `${comp}-${variant.lang}-${variant.style}`;
        const item = {
          name,
          type: 'registry:block',
          title: comp,
          description: description || undefined,
          files
        };
        if (dependencies.length) item.dependencies = dependencies;
        items.push(item);
      }
    }
  }

  items.sort((a, b) => a.name.localeCompare(b.name));
  return { items, categoryComponentSet };
}

function buildRegistry() {
  let existingMeta = {};
  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      const existing = readJSON(REGISTRY_PATH);
      const { $schema, name, homepage } = existing;
      existingMeta = { $schema, name, homepage };
    } catch (e) {
      // ignore malformed existing registry
    }
  }
  const defaultMeta = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: pkg.name || 'react-bits',
    homepage: pkg.homepage || 'https://reactbits.dev'
  };
  const meta = { ...defaultMeta, ...existingMeta };
  const { items, categoryComponentSet } = buildItems();
  const registry = { ...meta, items };
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');

  // Also emit a copy into /public/r/registry.json for direct consumption by the site
  try {
    fs.mkdirSync(path.dirname(PUBLIC_REGISTRY_PATH), { recursive: true });
    fs.writeFileSync(PUBLIC_REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');
  } catch (e) {
    console.error('Failed to write public registry copy:', e);
  }

  // Summary metrics
  const totalRegistryItems = items.length; // variants
  const totalFiles = items.reduce((sum, it) => sum + (it.files?.length || 0), 0);
  const uniqueComponents = Array.from(categoryComponentSet.values()).reduce((sum, set) => sum + set.size, 0);
  // Description coverage
  const allComponentKeys = [];
  categoryComponentSet.forEach((set, category) => {
    set.forEach(comp => allComponentKeys.push(`${category}/${comp}`));
  });
  const missingInfo = allComponentKeys.filter(k => !metadataKeyLowerSet.has(k.toLowerCase()));
  const coveragePct = (((allComponentKeys.length - missingInfo.length) / allComponentKeys.length) * 100).toFixed(1);

  // Fancy header
  const header = invert(bold(' REACT BITS REGISTRY '));
  console.log('\n' + header + '\n');

  const line = (label, value, colorFn = x => x) => {
    const padLabel = label.padEnd(20, ' ');
    console.log(`${gray('•')} ${dim(padLabel)} ${colorFn(value)}`);
  };

  line('Variant entries', totalRegistryItems.toString(), cyan);
  line('Unique components', uniqueComponents.toString(), magenta);
  line('Total files', totalFiles.toString(), green);
  line('Registry file', 'registry.json', yellow);
  line('Public copy', 'public/r/registry.json', yellow);
  line('Metadata coverage', `${coveragePct}%`, missingInfo.length ? yellow : green);
  if (missingInfo.length) {
    console.log('\n' + yellow('Missing metadata entries:'));
    missingInfo.sort().forEach(k => console.log(dim(' - ') + k));
  }

  // Category table
  console.log('\n' + underline(bold('Category breakdown')));
  const catEntries = Array.from(categoryComponentSet.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const maxCatLen = Math.max(...catEntries.map(([c]) => c.length), 'Category'.length);
  const headerRow = `${bold('Category'.padEnd(maxCatLen))}  ${bold('Components')}  ${bold('Bar')}`;
  console.log(headerRow);
  const maxCount = Math.max(...catEntries.map(([, set]) => set.size), 1);
  const barWidth = 24;
  catEntries.forEach(([cat, set]) => {
    const count = set.size;
    const filled = Math.round((count / maxCount) * barWidth);
    const bar = green('█'.repeat(filled)) + gray('░'.repeat(barWidth - filled));
    console.log(`${cat.padEnd(maxCatLen)}  ${count.toString().padStart(10)}  ${bar} `);
  });

  console.log('\n' + dim('Tip: run ') + bold('npm run generate:registry') + dim(' after adding components.\n'));
}

buildRegistry();
