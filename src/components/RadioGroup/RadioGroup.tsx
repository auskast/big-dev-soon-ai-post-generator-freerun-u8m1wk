"use client";

import * as React from "react";

import { useControllableState } from "@/hooks/useControllableState";

import { Radio } from "./Radio";
import {
  type RadioGroupContextValue,
  RadioGroupProvider,
  useRadioGroupContext,
} from "./RadioGroupContext";

/**
 * Lifted from [Radix UI](https://www.radix-ui.com/primitives/docs/components/radio-group)
 */

interface RadioGroupProps extends React.ComponentPropsWithoutRef<"div"> {
  name: RadioGroupContextValue["name"];
  disabled?: RadioGroupContextValue["disabled"];
  value?: RadioGroupContextValue["value"];
  defaultValue?: RadioGroupContextValue["value"];
  onValueChange?: RadioGroupContextValue["onValueChange"];
}

const RadioGroup = ({
  name,
  defaultValue,
  value: valueProp,
  disabled = false,
  onValueChange,
  ...props
}: RadioGroupProps) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <RadioGroupProvider
      name={name}
      disabled={disabled}
      value={value}
      onValueChange={setValue}
    >
      <div role="radiogroup" {...props} />
    </RadioGroupProvider>
  );
};

interface RadioGroupItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Radio>,
    "onCheck" | "name"
  > {
  value: string;
}

const RadioGroupItem = ({
  disabled: disabledProp,
  ...props
}: RadioGroupItemProps) => {
  const { name, disabled, value, onValueChange } =
    useRadioGroupContext("RadioGroupItem");
  const isDisabled = disabled || disabledProp;
  const checked = value === props.value;

  return (
    <Radio
      disabled={isDisabled}
      checked={checked}
      {...props}
      name={name}
      onCheck={() => onValueChange(props.value)}
    />
  );
};

export { RadioGroup, RadioGroupItem };
export type { RadioGroupItemProps, RadioGroupProps };
