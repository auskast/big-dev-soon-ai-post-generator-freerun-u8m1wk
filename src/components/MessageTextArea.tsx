"use client";

import * as React from "react";

const MAX_MESSAGE_LENGTH = 200;

interface MessageTextAreaProps {}

const MessageTextArea = ({ ...props }: MessageTextAreaProps) => {
  const [characterCount, setCharacterCount] = React.useState(0);

  return (
    <fieldset>
      <span className="flex items-baseline">
        <h2 id="your-message" className="header2 mb-2 flex-grow">
          Your message
        </h2>
        <span className="text-[14px]">
          {characterCount}/{MAX_MESSAGE_LENGTH}
        </span>
      </span>
      <textarea
        className="textarea w-full"
        name="message"
        placeholder="e.g. How to escape tutorial hell"
        rows={3}
        maxLength={MAX_MESSAGE_LENGTH}
        required
        onChange={(event) => setCharacterCount(event.target.value.length)}
        aria-labelledby="your-message"
      />
    </fieldset>
  );
};

export { MessageTextArea };
export type { MessageTextAreaProps };
