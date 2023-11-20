import * as React from "react";

/**
 * Lifted from [Radix UI](https://github.com/radix-ui/primitives/blob/main/packages/react/use-previous/src/usePrevious.tsx)
 */

function usePrevious<T>(value: T) {
  const ref = React.useRef({ value, previous: value });

  return React.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }

    return ref.current.previous;
  }, [value]);
}

export { usePrevious };
