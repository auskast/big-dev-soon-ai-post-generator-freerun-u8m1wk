"use client";

import * as React from "react";

import { usePrevious } from "@/hooks/usePrevious";
import { useSize } from "@/hooks/useSize";

import { RadioProvider } from "./RadioContext";

interface RadioProps extends React.ComponentPropsWithoutRef<"button"> {
  checked?: boolean;
  onCheck?: () => void;
}

const Radio = ({
  name,
  checked = false,
  disabled,
  value = "on",
  onCheck,
  ...props
}: RadioProps) => {
  const [button, setButton] = React.useState<HTMLButtonElement | null>(null);

  return (
    <RadioProvider checked={checked} disabled={disabled}>
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        value={value}
        {...props}
        ref={setButton}
        onClick={(event) => {
          props.onClick?.(event);
          if (!checked) onCheck?.();
        }}
      />
      <Input
        control={button}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        style={{ transform: "translateX(-100%)" }}
      />
    </RadioProvider>
  );
};

interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "checked"> {
  checked: boolean;
  control: HTMLElement | null;
}

const Input = ({ checked, control, ...props }: InputProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const prevChecked = usePrevious(checked);
  const controlSize = useSize(control);

  React.useEffect(() => {
    const input = ref.current;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(
      inputProto,
      "checked",
    ) as PropertyDescriptor;
    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", { bubbles: true });
      setChecked.call(input, checked);
      input?.dispatchEvent(event);
    }
  }, [prevChecked, checked]);

  return (
    <input
      type="radio"
      aria-hidden
      defaultChecked={checked}
      {...props}
      tabIndex={-1}
      ref={ref}
      style={{
        ...props.style,
        ...controlSize,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
      }}
    />
  );
};

export { Radio };
export type { RadioProps };
