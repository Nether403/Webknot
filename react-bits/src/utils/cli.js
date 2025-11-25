const variantForJsrepo = (language, style) => {
  const lang = (language || 'JS').toUpperCase();
  const sty = (style || 'CSS').toUpperCase();
  if (lang === 'TS' && sty === 'TW') return 'ts/tailwind';
  if (lang === 'TS') return 'ts/default';
  if (sty === 'TW') return 'tailwind';
  return 'default';
};
const variantForShadcn = (language, style) => `${(language || 'JS').toUpperCase()}-${(style || 'CSS').toUpperCase()}`;

const UPPERCASE_PARTS = new Set(['ascii']);

const slugToComponentName = slug => {
  if (!slug) return '';
  return slug
    .split('-')
    .map(part => {
      if (UPPERCASE_PARTS.has(part.toLowerCase())) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
};

export const generateCliCommands = (language, style, category, subcategory, dependencies = '') => {
  if (!category || !subcategory) return null;

  const jsrepoVariant = variantForJsrepo(language, style);
  const shadcnVariant = variantForShadcn(language, style);

  const componentName = slugToComponentName(subcategory);
  const baseUrl = 'https://reactbits.dev';

  const jsrepoCategory = category
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const jsrepoUrl = `${baseUrl}/${jsrepoVariant}/${jsrepoCategory}/${componentName}`;
  const shadcnUrl = `${baseUrl}/r/${componentName}-${shadcnVariant}`;

  const prefixCommands = {
    pnpm: 'pnpm dlx',
    npx: 'npx',
    yarn: 'yarn',
    bun: 'bun x --bun'
  };

  const jsrepo = Object.fromEntries(
    Object.entries(prefixCommands).map(([mgr, prefix]) => [mgr, `${prefix} jsrepo add ${jsrepoUrl}`])
  );
  const shadcn = Object.fromEntries(
    Object.entries(prefixCommands).map(([mgr, prefix]) => [mgr, `${prefix} shadcn@latest add ${shadcnUrl}`])
  );

  const depsString = typeof dependencies === 'string' ? dependencies.trim() : '';
  const manual = depsString
    ? {
        pnpm: `pnpm add ${depsString}`,
        npm: `npm install ${depsString}`,
        yarn: `yarn add ${depsString}`,
        bun: `bun add ${depsString}`
      }
    : null;

  return { manual, jsrepo, shadcn };
};
