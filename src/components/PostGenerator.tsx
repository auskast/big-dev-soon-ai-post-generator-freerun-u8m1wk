"use client";

import * as React from "react";

import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

import { MessageTextArea } from "./MessageTextArea";
import { SocialPlatforms } from "./SocialPlatforms";
import { StyleSelector } from "./StyleSelector";
import { ToneSelector } from "./ToneSelector";
import { BackIcon } from "./icons/BackIcon";
import { CheckIcon } from "./icons/CheckIcon";
import { CopyIcon } from "./icons/CopyIcon";
import { RegenerateIcon } from "./icons/RegenerateIcon";

type Steps = "generate" | "review";

type State = {
  step: Steps;
  isValid: boolean;
  isGenerating: boolean;
  isGenerated: boolean;
  generatedPost: string;
  error?: string;
  isCopied: boolean;
};

const initialState: State = {
  step: "generate",
  isValid: false,
  isGenerating: false,
  isGenerated: false,
  generatedPost: "",
  isCopied: false,
};

type Action =
  | {
      type: "validate";
      formRef: React.MutableRefObject<HTMLFormElement | null>;
    }
  | { type: "generate" }
  | { type: "receive"; data: string }
  | { type: "success" }
  | { type: "error"; error: string }
  | { type: "copy" }
  | { type: "back" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "validate":
      return {
        ...state,
        isValid: action.formRef.current?.checkValidity() ?? false,
      };
    case "generate":
      return {
        ...initialState,
        step: "review",
        isValid: state.isValid,
        isGenerating: true,
      };
    case "receive":
      return { ...state, generatedPost: state.generatedPost + action.data };
    case "success":
      return {
        ...state,
        isGenerating: false,
        isGenerated: true,
      };
    case "error":
      return {
        ...state,
        isGenerating: false,
        isGenerated: false,
        generatedPost: "",
        error: action.error,
      };
    case "copy":
      return {
        ...state,
        isCopied: true,
      };
    case "back":
      return {
        ...state,
        step: "generate",
      };
  }
}

interface PostGeneratorProps extends React.ComponentPropsWithoutRef<"form"> {}

const PostGenerator = ({
  className,
  onChange: onChangeProp,
  ...props
}: PostGeneratorProps) => {
  const [
    { step, isValid, isGenerating, isGenerated, generatedPost, isCopied },
    dispatch,
  ] = React.useReducer(reducer, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  function generate(formData: FormData) {
    dispatch({ type: "generate" });

    fetch("/api/generate", {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      if (!res.body) return;

      const reader = res.body.getReader();

      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          dispatch({ type: "success" });
          return;
        }
        const chunk = decoder.decode(value);
        dispatch({ type: "receive", data: chunk });
      }
    });
  }

  const handleChange: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      (event) => {
        dispatch({ type: "validate", formRef });
        onChangeProp?.(event);
      },
      [dispatch, onChangeProp],
    );

  return (
    <form {...props} action={generate} onChange={handleChange} ref={formRef}>
      <Tabs.Root value={step}>
        <Tabs.TabsContent
          value="generate"
          forceMount
          hidden={step !== "generate"}
        >
          <h1 className="header1 text-center mb-16">Generate your post</h1>
          <div className={clsx("flex flex-col gap-8", className)}>
            <SocialPlatforms />
            <MessageTextArea />
            <ToneSelector />
            <StyleSelector />
            <button
              type="submit"
              className="button button-primary"
              disabled={!isValid}
            >
              Generate Post
            </button>
          </div>
        </Tabs.TabsContent>
        <Tabs.TabsContent value="review" forceMount hidden={step !== "review"}>
          <h1 className="header1 text-center mb-16">Your generated post</h1>
          <div className={clsx("flex flex-col gap-12", className)}>
            <p className="textarea w-full min-h-[56px] p-3 after:content-['\00a0'] relative">
              <span className={clsx({ typewriter: isGenerating })}>
                {generatedPost}
              </span>
              {isGenerated ? (
                <CopyButton
                  isCopied={isCopied}
                  onCopy={() => {
                    navigator.clipboard.writeText(generatedPost);
                    dispatch({ type: "copy" });
                  }}
                />
              ) : null}
            </p>
            <div className="flex gap-8">
              <button
                type="button"
                className="button flex-1"
                disabled={isGenerating}
                onClick={() => dispatch({ type: "back" })}
              >
                <BackIcon className="inline-block" /> Back to Generator
              </button>
              <button
                type="submit"
                className="button button-primary flex-1"
                disabled={isGenerating}
              >
                <RegenerateIcon className="inline-block" /> Regenerate
              </button>
            </div>
          </div>
        </Tabs.TabsContent>
      </Tabs.Root>
    </form>
  );
};

interface CopyButtonProps {
  isCopied: boolean;
  onCopy: () => void;
}

const CopyButton = ({ isCopied, onCopy }: CopyButtonProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label={isCopied ? "copied" : "copy"}
            className={clsx(
              "absolute top-3 right-3 button bg-white shadow-ai transition-colors",
              isCopied ? "p-1 border-green shadow-green/10" : "p-2",
            )}
            disabled={isCopied}
            onClick={() => {
              if (!isCopied) onCopy();
            }}
          >
            {isCopied ? (
              <CheckIcon width={24} height={24} className="!fill-green" />
            ) : (
              <CopyIcon width={16} height={16} />
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-black text-white text-xs leading-normal body2 p-1 rounded-md transition-opacity"
            side="bottom"
            sideOffset={4}
          >
            {isCopied ? "Copied!" : "Copy post"}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export { PostGenerator };
export type { PostGeneratorProps };
