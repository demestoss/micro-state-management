import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type NextState<T> = T | ((prev: T) => T);

export interface Store<T> {
  get: () => T;
  set: (state: NextState<T>) => void;
  subscribe: (listener: (state: T) => void) => () => void;
}

function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const callbacks = new Set<(state: T) => void>();

  const get = () => state;

  const set = (next: NextState<T>) => {
    state = typeof next === "function" ? (next as (prev: T) => T)(state) : next;
    callbacks.forEach((callback) => callback(state));
  };

  const subscribe = (fn: (state: T) => void) => {
    callbacks.add(fn);
    return () => {
      callbacks.delete(fn);
    };
  };

  return { get, set, subscribe };
}

function useStore<T, S>(store: Store<T>, selector: (state: T) => S) {
  const [state, setState] = useState(() => selector(store.get()));

  useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      setState(selector(newState));
    });
    return () => {
      unsubscribe();
    };
  }, [store, selector]);

  return state;
}

// Creating global store hook (like Zustand)
function create<T>(initialState: T) {
  const store = createStore(initialState);

  return <S extends unknown = T>(selector: (state: T) => S = (state) => state as unknown as S) =>
    useStore(store, selector);
}

function createStoreContext<T>(defaultValue?: T) {
  const StoreContext = createContext<Store<T> | undefined>(
    defaultValue && createStore(defaultValue)
  );

  const Provider: FC<{ initialState: T; children: ReactNode }> = ({ initialState, children }) => {
    const valueRef = useRef<Store<T>>();
    if (!valueRef.current) {
      valueRef.current = createStore(initialState);
    }

    return <StoreContext.Provider value={valueRef.current}>{children}</StoreContext.Provider>;
  };

  const useStoreContext = () => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("useStore must be used within a StoreProvider");
    }
    return store;
  };

  function useStoreSelector<S = T>(selector: (state: T) => S = (s: T) => s as unknown as S) {
    const store = useStoreContext();
    return useStore(store, selector);
  }

  function useStoreMutation<S = T>(mutator: NextState<T>) {
    const store = useStoreContext();

    const mutatorRef = useRef<NextState<T>>(mutator);

    useEffect(() => {
      mutatorRef.current = mutator;
    }, [mutator]);

    return useCallback(() => {
      store.set(mutatorRef.current);
    }, [store]);
  }

  return [Provider, useStoreSelector, useStoreMutation] as const;
}

export { createStoreContext, createStore, useStore, create };
