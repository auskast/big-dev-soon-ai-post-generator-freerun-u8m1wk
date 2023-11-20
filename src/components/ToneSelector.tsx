"use client";

import * as React from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";

import type { RequestData } from "@/app/api/generate/route";

import { Selector } from "./Selector";

const tones: { name: string; value: RequestData["tone"] }[] = [
  {
    name: "Polite",
    value: "polite",
  },
  {
    name: "Funny",
    value: "funny",
  },
  {
    name: "Friendly",
    value: "friendly",
  },
  {
    name: "Informal",
    value: "informal",
  },
  {
    name: "Serious",
    value: "serious",
  },
  {
    name: "Optimistic",
    value: "optimistic",
  },
  {
    name: "Motivational",
    value: "motivational",
  },
];

interface ToneSelectorProps {
  onChange?: (value: string) => void;
}

const ToneSelector = ({ onChange }: ToneSelectorProps) => {
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
        Tone of voice
      </label>
      <RadioGroup.Root
        id={fieldId}
        name="tone"
        className="flex flex-wrap gap-2"
        onValueChange={handleChange}
        required
      >
        {tones.map(({ name, value }) => (
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

export { ToneSelector };
export type { ToneSelectorProps };
