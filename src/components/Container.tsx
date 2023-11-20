import * as React from "react";

import clsx from "clsx";

interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

const Container = ({ className, ...props }: ContainerProps) => {
  return (
    <div
      className={clsx("w-full sm:max-w-3xl mx-auto p-6", className)}
      {...props}
    />
  );
};

export { Container };
export type { ContainerProps };
