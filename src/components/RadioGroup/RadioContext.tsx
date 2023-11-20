"use client";

import * as React from "react";

type RadioContextValue = {
  checked: boolean;
  disabled?: boolean;
};

const RadioContext = React.createContext<RadioContextValue | undefined>(
  undefined,
);

interface RadioProviderProps
  extends React.PropsWithChildren<RadioContextValue> {}

const RadioProvider = ({ children, ...props }: RadioProviderProps) => {
  return (
    <RadioContext.Provider value={props}>{children}</RadioContext.Provider>
  );
};

function useRadioContext(componentName: string) {
  const context = React.useContext(RadioContext);

  if (!context) {
    throw new Error(`\`${componentName}\` must be used inside a \`Radio\``);
  }

  return context;
}

export { RadioProvider, useRadioContext };
export type { RadioContextValue };
