import { DependencyList, useCallback, useLayoutEffect, useRef } from "react";

function useEvent<T extends (...args: any[]) => any>(
  handler?: T,
  additionalDeps: DependencyList = []
) {
  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args: any[]) => handlerRef.current?.(...args)) as T, additionalDeps);
}

export { useEvent };
