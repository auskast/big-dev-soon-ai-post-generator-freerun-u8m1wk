import * as React from "react";

interface ContainerProps extends React.PropsWithChildren {}

const Container = ({ children, ...props }: React.PropsWithChildren) => {
  return (
    <div className="w-full sm:max-w-3xl mx-auto p-6" {...props}>
      {children}
    </div>
  );
};

export { Container };
export type { ContainerProps };
