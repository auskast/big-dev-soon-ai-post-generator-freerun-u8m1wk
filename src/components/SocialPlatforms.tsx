"use client";

import * as React from "react";

import clsx from "clsx";

import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { FacebookIcon } from "./icons/FacebookIcon";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { RedditIcon } from "./icons/RedditIcon";
import { TwitterIcon } from "./icons/TwitterIcon";

interface SocialPlatformsProps {}

const SocialPlatforms = ({}: SocialPlatformsProps) => {
  const [value, setValue] = React.useState<string>();

  return (
    <section className="mt-16">
      <h2 className="header2 mb-4">Social platform</h2>
      <RadioGroup
        className="flex gap-2"
        name="platform"
        onValueChange={setValue}
      >
        <SocialPlatform
          name="Facebook"
          value="facebook"
          icon={<FacebookIcon />}
          selected={value === "facebook"}
        />
        <SocialPlatform
          name="X (formerly Twitter)"
          value="twitter"
          icon={<TwitterIcon />}
          selected={value === "twitter"}
        />
        <SocialPlatform
          name="Reddit"
          value="reddit"
          icon={<RedditIcon />}
          selected={value === "reddit"}
        />
        <SocialPlatform
          name="LinkedIn"
          value="linkedin"
          icon={<LinkedinIcon />}
          selected={value === "linkedin"}
        />
      </RadioGroup>
    </section>
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
    <RadioGroupItem
      className={clsx(
        "border border-solid p-3 rounded-lg shadow-ai",
        selected
          ? "border-green bg-lightgreen/16 fill-green shadow-green/10"
          : "border-gray bg-lightgray fill-black",
      )}
      value={value}
      title={name}
    >
      {icon}
    </RadioGroupItem>
  );
};

export { SocialPlatforms };
export type { SocialPlatformsProps };
