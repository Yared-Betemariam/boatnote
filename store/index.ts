import { ReactNode } from "react";
import { create } from "zustand";

export type Children = {
  x: number;
  y: number;
};

export type Tool = {
  type: "text" | "draw" | "reset";
};

interface SelectedTool {
  tool?: Tool;
  setTool: (tool: Tool) => void;
  resetTool: () => void;
}

interface SelectedChildren {
  children?: Children;
  setChildren: (children: Children) => void;
  resetChildren: () => void;
}

export const useTools = create<SelectedTool>((set, get) => ({
  resetTool: () => {
    set({ tool: undefined });
    useSelectedChildren.getState().resetChildren();
  },
  setTool: (tool) => {
    set({ tool });
    useSelectedChildren.getState().resetChildren();
  },
}));

export const useSelectedChildren = create<SelectedChildren>((set, get) => ({
  resetChildren: () => {
    set({ children: undefined });
  },
  setChildren: (children) => {
    set({ children });
  },
}));
