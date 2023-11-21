"use client";

import * as React from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

import type { RequestData } from "@/app/api/generate/route";

import { FacebookIcon } from "./icons/FacebookIcon";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { RedditIcon } from "./icons/RedditIcon";
import { TwitterIcon } from "./icons/TwitterIcon";

const platforms: {
  name: string;
  value: RequestData["platform"];
  icon: React.ReactNode;
}[] = [
  {
    name: "Facebook",
    value: "facebook",
    icon: <FacebookIcon />,
  },
  {
    name: "X (formerly Twitter)",
    value: "twitter",
    icon: <TwitterIcon />,
  },
  {
    name: "Reddit",
    value: "reddit",
    icon: <RedditIcon />,
  },
  {
    name: "LinkedIn",
    value: "linkedin",
    icon: <LinkedinIcon />,
  },
];

interface SocialPlatformsProps {
  onChange?: (value: string) => void;
}

const SocialPlatforms = ({ onChange }: SocialPlatformsProps) => {
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
      <label htmlFor={fieldId} className="header2 inline-block mb-4">
        Social platform
      </label>
      <RadioGroup.Root
        id={fieldId}
        name="platform"
        className="flex gap-2"
        required
        onValueChange={handleChange}
      >
        {platforms.map(({ name, value, icon }) => (
          <SocialPlatform
            key={value}
            name={name}
            value={value}
            icon={icon}
            selected={selected === value}
          />
        ))}
      </RadioGroup.Root>
    </fieldset>
  );
};

interface SocialPlatformProps {
  name: string;
  value: string;
  icon: React.ReactNode;
  selected: boolean;
}

const SocialPlatform = ({
  name,
  value,
  icon,
  selected,
}: SocialPlatformProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <RadioGroup.Item
            className={clsx(
              "border border-solid p-3 rounded-lg shadow-ai",
              selected
                ? "border-green bg-lightgreen/16 fill-green shadow-green/10"
                : "border-gray bg-lightgray fill-black",
            )}
            value={value}
            aria-label={name}
          >
            {icon}
          </RadioGroup.Item>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-black text-white text-xs leading-normal body2 p-1 rounded-md transition-opacity"
            side="bottom"
            sideOffset={4}
          >
            {name}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export { SocialPlatforms };
export type { SocialPlatformsProps };
