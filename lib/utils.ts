import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mousePointToCanvas = (
  e: ClientPoint,
  canvas?: HTMLCanvasElement | null
) => {
  if (!canvas) return;
  return {
    x: e.clientX * (canvas.width / window.innerWidth),
    y: e.clientY * (canvas.height / window.innerHeight),
  } as Point;
};
