import { useEffect, useRef, useCallback } from "react";
import mermaid from "mermaid";

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

export default function MermaidDiagram({ diagram }: { diagram: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const render = useCallback(async () => {
    if (!ref.current) return;
    try {
      const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const { svg } = await mermaid.render(id, diagram);
      if (ref.current) ref.current.innerHTML = svg;
    } catch {
      if (ref.current) ref.current.textContent = "Failed to render diagram";
    }
  }, [diagram]);

  useEffect(() => { render(); }, [render]);

  return (
    <div
      ref={ref}
      className="rounded-lg bg-bg-surface p-6 overflow-x-auto [&_svg]:w-full [&_svg]:h-auto"
    />
  );
}
