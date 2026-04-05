import { Highlight, themes } from "prism-react-renderer";
import type { ProjectShowcase } from "../types";
import MermaidDiagram from "./MermaidDiagram";

interface Props {
  showcase: ProjectShowcase;
}

export default function SchemaShowcase({ showcase }: Props) {
  return (
    <div className="mt-8 space-y-8">
      {showcase.sections.map((section) => (
        <div key={section.title}>
          <h4 className="font-display text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
            {section.title}
          </h4>
          <MermaidDiagram diagram={section.diagram} />
          <p className="mt-3 text-sm text-text-tertiary italic">
            {section.annotation}
          </p>
        </div>
      ))}

      {showcase.sqlSnippets.length > 0 && (
        <div>
          <h4 className="font-display text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
            Key Queries
          </h4>
          <div className="space-y-6">
            {showcase.sqlSnippets.map((snippet) => (
              <div key={snippet.title}>
                <h5 className="text-sm font-medium text-text-primary mb-2">
                  {snippet.title}
                </h5>
                <Highlight
                  theme={themes.oneDark}
                  code={snippet.code.trim()}
                  language="sql"
                >
                  {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                      className="rounded-lg bg-bg-surface p-4 overflow-x-auto text-sm leading-relaxed"
                      style={{ ...style, background: "#161618" }}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
                <p className="mt-2 text-sm text-text-tertiary italic">
                  {snippet.annotation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
