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

interface StyleSelectorProps {}

const StyleSelector = ({ ...props }: StyleSelectorProps) => {
  const [selected, setSelected] = React.useState<string>();

  return (
    <fieldset>
      <h2 id="post-style" className="header2 mb-2">
        Post style
      </h2>
      <RadioGroup.Root
        className="flex gap-2"
        name="style"
        onValueChange={setSelected}
        required
        aria-labelledby="post-style"
      >
        {styles.map(({ name, value }) => (
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

export { StyleSelector };
export type { StyleSelectorProps };
