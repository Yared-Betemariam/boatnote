import { useSelectedChildren, useTools } from "@/store";
import { MouseEvent } from "react";

export const useInput = () => {
  const setChildren = useSelectedChildren((state) => state.setChildren);
  const tool = useTools((state) => state.tool);
  const isText = tool ? tool.type === "text" : false;

  const onClick = (e: MouseEvent) => {
    if (!isText) return;
    setChildren({
      x: e.clientX,
      y: e.clientY,
    });
    document.getElementById("input_field")?.focus();
  };

  return { onClick };
};
