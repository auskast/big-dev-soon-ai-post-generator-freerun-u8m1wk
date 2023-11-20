"use client";

import * as React from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

import { FacebookIcon } from "./icons/FacebookIcon";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { RedditIcon } from "./icons/RedditIcon";
import { TwitterIcon } from "./icons/TwitterIcon";

const platforms: { name: string; value: string; icon: React.ReactNode }[] = [
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

interface SocialPlatformsProps {}

const SocialPlatforms = ({}: SocialPlatformsProps) => {
  const [selected, setSelected] = React.useState<string>();

  return (
    <fieldset>
      <h2 id="social-platform" className="header2 mb-4">
        Social platform
      </h2>
      <RadioGroup.Root
        className="flex gap-2"
        name="platform"
        required
        onValueChange={setSelected}
        aria-labelledby="social-platform"
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
            <Tooltip.Arrow />
            {name}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export { SocialPlatforms };
export type { SocialPlatformsProps };
