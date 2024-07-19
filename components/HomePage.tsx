"use client";

import { useDraw } from "@/hooks/useDraw";
import { useRef, useState } from "react";
import { BsCursorText, BsPencil } from "react-icons/bs";
import { MdOutlineCleaningServices } from "react-icons/md";
import ColorPicker from "./ColorPicker";
import Tool from "./Tool";
import Logo from "./Logo";
import { useSelectedChildren } from "@/store";
import { useInput } from "@/hooks/userInput";
import Input from "./Input";
import { mousePointToCanvas } from "@/lib/utils";
import { useWindowSize } from "usehooks-ts";
import { useShortcuts } from "@/hooks/useShortcut";

const HomePage = () => {
  const [color, setColor] = useState("#fff");
  const size = useWindowSize();
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  useShortcuts(clear);

  const { children } = useSelectedChildren((state) => state);
  const { onClick } = useInput();

  function drawLine({ ctx, currentPoint, prevPoint }: Draw) {
    const { x: currentX, y: currentY } = currentPoint;
    const lineWidth = 8;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <main
      onClick={onClick}
      className="relative flex flex-1 flex-col overflow-hidden"
    >
      <Logo />
      <div className=" absolute flex flex-col left-4 top-1/2 -translate-y-1/2 bg-gray-700/0 rounded-2xl shadow-2xl p-2 gap-4 z-50">
        <Tool
          Icon={BsCursorText}
          tool={{
            type: "text",
          }}
        />
        <Tool
          Icon={BsPencil}
          tool={{
            type: "draw",
          }}
        />
        <ColorPicker
          color={color}
          onChange={(newColor) => setColor(newColor)}
        />
        <Tool
          Icon={MdOutlineCleaningServices}
          tool={{
            type: "reset",
          }}
          onClick={clear}
        />
      </div>
      <span className="select-none font-normal opacity-60 absolute top-2 right-4">
        canvas
      </span>
      <div className="absolute inset-0 flex">
        {size && (
          <canvas
            onMouseDown={onMouseDown}
            ref={canvasRef}
            width={size.width * 2}
            height={size.height * 2}
          />
        )}
      </div>
      {children && (
        <Input
          color={color}
          onEnter={(data) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const res = mousePointToCanvas(
              {
                clientX: data.x,
                clientY: data.y,
              },
              canvas
            );
            if (!res) return;
            ctx.font = "500 44px system-ui";
            ctx.fillStyle = color;
            // ctx.letterSpacing = "1px";
            ctx.fillText(data.text, res.x, res.y);
          }}
          child={children}
        />
      )}
    </main>
  );
};
export default HomePage;
