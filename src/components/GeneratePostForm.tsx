"use client";

import * as React from "react";

import clsx from "clsx";

import { MessageTextArea } from "./MessageTextArea";
import { SocialPlatforms } from "./SocialPlatforms";
import { StyleSelector } from "./StyleSelector";
import { ToneSelector } from "./ToneSelector";

const GeneratePostForm = () => {
  const [isReady, setIsReady] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  async function generate(formData: FormData) {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: formData,
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    let post = "";

    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) return;
      post += decoder.decode(value);
      // TODO fix this in the next steps
      console.log(post);
    }
  }

  const handleChange: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(() => {
      setIsReady(formRef.current?.checkValidity() ?? false);
    }, [setIsReady]);

  return (
    <form
      action={generate}
      className="flex flex-col gap-8"
      onChange={handleChange}
      ref={formRef}
    >
      <SocialPlatforms />
      <MessageTextArea />
      <ToneSelector />
      <StyleSelector />
      <button
        type="submit"
        className={clsx("button", { "button-locked": !isReady })}
        disabled={!isReady}
      >
        Generate Post
      </button>
    </form>
  );
};

export { GeneratePostForm };
