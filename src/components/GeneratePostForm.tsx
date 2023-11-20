"use client";

import { FormEventHandler } from "react";

import { MessageTextArea } from "./MessageTextArea";
import { SocialPlatforms } from "./SocialPlatforms";

const GeneratePostForm = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("submit", event);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <SocialPlatforms />
      <MessageTextArea />
    </form>
  );
};

export { GeneratePostForm };
