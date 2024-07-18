import { mousePointToCanvas } from "@/lib/utils";
import { useTools } from "@/store";
import { useEffect, useRef, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState(false);
  const tool = useTools((state) => state.tool);
  const isDraw = tool ? tool.type === "draw" : false;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => isDraw && setMouseDown(true);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;
      const currentPoint = mousePointToCanvas(e, canvas);
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPoint.current = null;
    };
    if (isDraw) {
      canvas?.addEventListener("mousemove", handler);
      window.addEventListener("mouseup", mouseUpHandler);
    } else {
      canvas?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseUpHandler);
    }
    return () => {
      if (isDraw) {
        canvas?.removeEventListener("mousemove", handler);
        window.removeEventListener("mouseup", mouseUpHandler);
      }
    };
  }, [onDraw]);

  return { canvasRef, onMouseDown, clear };
};
