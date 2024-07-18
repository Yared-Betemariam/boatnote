import { cn } from "@/lib/utils";
import { Children, useSelectedChildren, useTools } from "@/store";
import { useState } from "react";

type Props = {
  child: Children;
  onEnter: (data: { text: string; x: number; y: number }) => void;
};

const Input = ({ child, onEnter }: Props) => {
  const setTool = useTools((state) => state.setTool);
  const { resetChildren } = useSelectedChildren();
  const [val, setVal] = useState("");
  return (
    <label
      htmlFor="input_field"
      autoFocus
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      style={{
        top: `${child.y / 16}rem`,
        left: `${child.x / 16}rem`,
        width: `${val.length + 4}ch`,
      }}
      className={cn(
        `absolute z-20 h-[2ch] -translate-y-full focus-visible:bg-white min-w-[6ch]`
      )}
    >
      <input
        id="input_field"
        value={val}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter({
              text: val,
              x: child.x,
              y: child.y,
            });
            setTool({
              type: "draw",
            });
            resetChildren();
          }
        }}
        autoFocus
        onChange={(e) => setVal(e.target.value)}
        className="absolute inset-0 z-50 outline-none focus-visible:outline-none bg-transparent text-gray-100 text-[22px] p-0"
      />
      {/* {isSelected && (
        <div className="relative h-full w-full">
          <span className="w-[10px] bg-gray-900 h-[10px] border rounded-[3px] border-gray-100 absolute -top-[3px] -left-[3px]" />
          <span className="w-[10px] bg-gray-900 h-[10px] border rounded-[3px] border-gray-100 absolute -top-[3px] -right-[3px]" />
          <span className="w-[10px] bg-gray-900 h-[10px] border rounded-[3px] border-gray-100 absolute -bottom-[3px] -left-[3px]" />
          <span className="w-[10px] bg-gray-900 h-[10px] border rounded-[3px] border-gray-100 absolute -bottom-[3px] -right-[3px]" />
        </div>
      )} */}
    </label>
  );
};
export default Input;
