"use client";

import * as React from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";

import { Selector } from "./Selector";

const tones: { name: string; value: string }[] = [
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

interface ToneSelectorProps {}

const ToneSelector = ({ ...props }: ToneSelectorProps) => {
  const [selected, setSelected] = React.useState<string>();

  return (
    <fieldset>
      <h2 id="tone-of-voice" className="header2 mb-2">
        Tone of voice
      </h2>
      <RadioGroup.Root
        className="flex gap-2"
        name="tone"
        onValueChange={setSelected}
        required
        aria-labelledby="tone-of-voice"
      >
        {tones.map(({ name, value }) => (
          <Selector
            key={value}
            name={name}
            value={value}
            selected={selected === value}
          />
        ))}
      </RadioGroup.Root>
    </fieldset>
  );
};

export { ToneSelector };
export type { ToneSelectorProps };
