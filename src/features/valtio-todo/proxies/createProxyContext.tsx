import { createContext, FC, PropsWithChildren, useContext, useRef } from "react";

function createProxyContext<State>() {
  const ProxyContext = createContext<State | undefined>(undefined);

  const Provider: FC<PropsWithChildren<{ createProxy: () => State }>> = ({
    createProxy,
    children,
  }) => {
    const state = useRef(createProxy()).current;

    return <ProxyContext.Provider value={state}>{children}</ProxyContext.Provider>;
  };

  const useProxy = () => {
    const context = useContext(ProxyContext);
    if (!context) {
      throw new Error("useProxy must be used within a ProxyProvider");
    }
    return context;
  };

  return [Provider, useProxy] as const;
}

export { createProxyContext };
