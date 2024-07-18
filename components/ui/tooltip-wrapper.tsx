import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const TooltipWrapper = ({
  children,
  label,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="bg-black/50 rounded-xl p-3 text-2xl">
          {children}
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="start"
          sideOffset={10}
          className="bg-gray-900 text-gray-100 rounded-none border border-gray-100/15"
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default TooltipWrapper;
