import { cn } from "@/lib/utils";
import { Tool as ToolType, useTools } from "@/store";
import { IconType } from "react-icons";

const Tool = ({
  Icon,
  tool,
  onClick,
}: {
  Icon: IconType;
  tool: ToolType;
  onClick?: () => void;
}) => {
  const { tool: selectedTool, setTool } = useTools((state) => state);
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (tool.type !== "reset") {
          setTool(tool);
        }
        onClick && onClick();
      }}
      className={cn(
        "bg-gray-800 h-[44px] w-[44px] active:opacity-60 rounded-xl grid place-content-center text-xl cursor-pointer shadow-xl",
        tool.type === selectedTool?.type
          ? "ring-4 ring-secondary"
          : "opacity-80"
      )}
    >
      <Icon />
    </span>
  );
};
export default Tool;
