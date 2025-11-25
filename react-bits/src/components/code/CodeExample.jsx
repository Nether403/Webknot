import { getLanguage } from '../../utils/utils';
import CliInstallation from './CliInstallation';
import CodeHighlighter from './CodeHighlighter';
import CodeOptions, { CSS, Tailwind, TSCSS, TSTailwind } from './CodeOptions';

const SKIP_KEYS = new Set(['tailwind', 'css', 'tsTailwind', 'tsCode', 'dependencies']);

const CodeExample = ({ codeObject }) => {
  const { tailwind, css, tsTailwind, tsCode, code, dependencies } = codeObject;

  const renderCssSection = () =>
    css && (
      <>
        <h2 className="demo-title">CSS</h2>
        <CodeHighlighter snippetId="css" language="css" codeString={css} />
      </>
    );

  return (
    <>
      <CliInstallation deps={dependencies} />

      {Object.entries(codeObject).map(([name, snippet]) => {
        if (SKIP_KEYS.has(name)) return null;

        if (name === 'code' || name === 'tsCode') {
          return (
            <div key={name}>
              <h2 className="demo-title">{name}</h2>
              <CodeOptions>
                {tailwind && (
                  <Tailwind>
                    <CodeHighlighter snippetId="code" language="jsx" codeString={tailwind} />
                  </Tailwind>
                )}
                {code && (
                  <CSS>
                    <CodeHighlighter snippetId="code" language="jsx" codeString={code} />
                    {/* Render CSS snippet if available */}
                    {css && renderCssSection()}
                  </CSS>
                )}
                {tsTailwind && (
                  <TSTailwind>
                    <CodeHighlighter snippetId="code" language="tsx" codeString={tsTailwind} />
                  </TSTailwind>
                )}
                {tsCode && (
                  <TSCSS>
                    <CodeHighlighter snippetId="code" language="tsx" codeString={tsCode} />
                    {renderCssSection()}
                  </TSCSS>
                )}
              </CodeOptions>
            </div>
          );
        }

        return (
          <div key={name}>
            <h2 className="demo-title">{name}</h2>
            <CodeHighlighter snippetId={name} language={getLanguage(name)} codeString={snippet} />
          </div>
        );
      })}
    </>
  );
};

export default CodeExample;
