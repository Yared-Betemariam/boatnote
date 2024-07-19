import { useTools } from "@/store";
import { useEffect } from "react";

export const useShortcuts = (clear: () => void) => {
  const { tool, setTool } = useTools();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key == "z") {
        setTool({
          type: "text",
        });
      }
      if (e.ctrlKey && e.key == "x") {
        setTool({
          type: "draw",
        });
      }
      if (e.key == "c") {
        clear();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.addEventListener("keydown", handler);
  }, [clear, tool, setTool]);

  return;
};
