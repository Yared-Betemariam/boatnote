import { HexAlphaColorPicker, HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const ColorPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (val: string) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild className="shadow-sm bg-white/80">
        <Button
          variant="ghost"
          className="flex flex-col px-2 py-0 rounded-[14px] border-none  h-[44px] w-[44px] items-center justify-center"
        >
          <div
            className="w-10 h-10 rounded-xl simpleborder border-gray-900/65"
            style={{
              backgroundColor: color,
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={12}
        className="w-60 rounded-xl border border-gray-100/30 shadow-xl mx-6 bg-gray-950/70"
      >
        {/* <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Logo Address</h4>
            <p className="text-sm text-muted-foreground">
              Copy below the image adress
            </p>
          </div>
          <div className="grid gap-2">
            <Input
              id="width"
              placeholder={JTML?.data[0]?.data[0].src}
              className="col-span-2 h-8"
              onChange={(e) => {
                const val = e.target.value;
                if (JTML.data[0].data[0]) {
                  JTML.data[0].data[0].src = val;
                }
                updateData(JTML);
              }}
            />
          </div>
        </div> */}
        <HexAlphaColorPicker
          color={color}
          onChange={(n) => {
            onChange(n);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
export default ColorPicker;
