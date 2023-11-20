"use client";

import * as React from "react";

type RadioGroupContextValue = {
  name: string;
  disabled: boolean;
  value?: string;
  onValueChange: (value: string) => void;
};

const RadioGroupContext = React.createContext<
  RadioGroupContextValue | undefined
>(undefined);

interface RadioGroupProviderProps
  extends React.PropsWithChildren<RadioGroupContextValue> {}

const RadioGroupProvider = ({
  children,
  ...props
}: RadioGroupProviderProps) => {
  return (
    <RadioGroupContext.Provider value={props}>
      {children}
    </RadioGroupContext.Provider>
  );
};

function useRadioGroupContext(componentName: string) {
  const context = React.useContext(RadioGroupContext);

  if (!context) {
    throw new Error(
      `\`${componentName}\` must be used inside a \`RadioGroup\``,
    );
  }

  return context;
}

export { RadioGroupProvider, useRadioGroupContext };
export type { RadioGroupContextValue };
