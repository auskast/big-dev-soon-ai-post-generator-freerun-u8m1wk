import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";

interface SelectorProps {
  name: string;
  value: string;
  selected: boolean;
}

const Selector = ({ name, value, selected }: SelectorProps) => {
  return (
    <RadioGroup.Item
      className={clsx(
        "border border-solid px-[10px] py-[6px] rounded-full body2",
        selected
          ? "border-green bg-lightgreen/16 text-green"
          : "border-lightgray",
      )}
      value={value}
    >
      {name}
    </RadioGroup.Item>
  );
};

export { Selector };
export type { SelectorProps };
