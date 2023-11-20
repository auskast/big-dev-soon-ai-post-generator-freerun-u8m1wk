"use client";

import * as React from "react";

const MAX_MESSAGE_LENGTH = 200;

interface MessageTextAreaProps {
  onChange?: (value: string) => void;
}

const MessageTextArea = ({ onChange }: MessageTextAreaProps) => {
  const [characterCount, setCharacterCount] = React.useState(0);
  const fieldId = React.useId();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    React.useCallback(
      (event) => {
        setCharacterCount(event.target.value.length);
        onChange?.(event.target.value);
      },
      [onChange],
    );

  return (
    <fieldset>
      <span className="flex items-baseline mb-2">
        <label htmlFor={fieldId} className="header2 flex-grow">
          Your message
        </label>
        <span className="text-[14px]">
          {characterCount}/{MAX_MESSAGE_LENGTH}
        </span>
      </span>
      <textarea
        id={fieldId}
        name="message"
        className="textarea w-full"
        placeholder="e.g. How to escape tutorial hell"
        rows={3}
        maxLength={MAX_MESSAGE_LENGTH}
        required
        onChange={handleChange}
      />
    </fieldset>
  );
};

export { MessageTextArea };
export type { MessageTextAreaProps };
