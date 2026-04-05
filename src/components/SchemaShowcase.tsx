import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Highlight, themes } from "prism-react-renderer";
import type { ProjectSchema } from "../types";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#f0c040",
    primaryTextColor: "#ededef",
    primaryBorderColor: "#1e1e22",
    lineColor: "#6e6e73",
    secondaryColor: "#161618",
    tertiaryColor: "#0a0a0b",
  },
});

interface Props {
  schema: ProjectSchema;
}

export default function SchemaShowcase({ schema }: Props) {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diagramRef.current) return;

    const id = `mermaid-${Date.now()}`;
    mermaid.render(id, schema.mermaidDiagram).then(({ svg }) => {
      if (diagramRef.current) {
        diagramRef.current.innerHTML = svg;
      }
    }).catch(() => {
      if (diagramRef.current) {
        diagramRef.current.textContent = "Failed to render diagram";
      }
    });
  }, [schema.mermaidDiagram]);

  return (
    <div className="mt-8 space-y-8">
      <div>
        <h4 className="font-display text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
          Schema Design
        </h4>
        <div
          ref={diagramRef}
          className="rounded-lg bg-bg-surface p-6 overflow-x-auto [&_svg]:max-w-full"
        />
      </div>

      {schema.sqlSnippets.length > 0 && (
        <div>
          <h4 className="font-display text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
            Key Queries
          </h4>
          <div className="space-y-6">
            {schema.sqlSnippets.map((snippet) => (
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
