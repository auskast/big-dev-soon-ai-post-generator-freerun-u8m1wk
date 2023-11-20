"use client";

import * as React from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";

import { Selector } from "./Selector";

const styles: { name: string; value: string }[] = [
  {
    name: "Work",
    value: "work",
  },
  {
    name: "Opinion",
    value: "opinion",
  },
  {
    name: "Case study",
    value: "case study",
  },
  {
    name: "Story",
    value: "story",
  },
  {
    name: "Tutorial",
    value: "tutorial",
  },
];

interface StyleSelectorProps {
  onChange?: (value: string) => void;
}

const StyleSelector = ({ onChange }: StyleSelectorProps) => {
  const [selected, setSelected] = React.useState<string>();
  const fieldId = React.useId();

  const handleChange = React.useCallback(
    (value: string) => {
      setSelected(value);
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <fieldset>
      <label htmlFor={fieldId} className="header2 inline-block mb-2">
        Post style
      </label>
      <RadioGroup.Root
        id={fieldId}
        name="style"
        className="flex flex-wrap gap-2"
        onValueChange={handleChange}
        required
      >
        {styles.map(({ name, value }) => (
          <Selector
            key={value}
            name={name}
            value={value}
            selected={selected === value}
            required
          />
        ))}
      </RadioGroup.Root>
    </fieldset>
  );
};

export { StyleSelector };
export type { StyleSelectorProps };
