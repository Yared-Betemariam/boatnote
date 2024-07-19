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
      if (e.ctrlKey && e.key == "c") {
        clear();
      }
    };

    const handler2 = (e: MouseEvent) => {
      if (e.ctrlKey) {
        setTool({
          type: "text",
        });
      }
    };
    document.addEventListener("keydown", handler);
    document.addEventListener("click", handler2);
    return () => {
      document.addEventListener("keydown", handler);
      document.removeEventListener("click", handler2);
    };
  }, [clear, tool, setTool]);

  return;
};
