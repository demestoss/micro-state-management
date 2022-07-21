import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
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

type Mutator<T, U> = (state: T, update: U) => T;

function useMutation<T, U = undefined>(store: Store<T>, mutator: Mutator<T, U>) {
  const mutatorRef = useRef<Mutator<T, U>>(mutator);

  useEffect(() => {
    mutatorRef.current = mutator;
  }, [mutator]);

  return useCallback(
    (update: U) => {
      store.set((prev) => mutatorRef.current(prev, update));
    },
    [store]
  ) as undefined extends U ? (update?: U) => void : (update: U) => void;
}

function create<T>(initialState: T) {
  const store = createStore(initialState);

  function useStoreSelector<S = T>(selector: (state: T) => S = (s: T) => s as unknown as S) {
    return useStore(store, selector);
  }

  function useStoreMutation<U = unknown>(mutator: Mutator<T, U>) {
    return useMutation(store, mutator);
  }

  return [useStoreSelector, useStoreMutation] as const;
}

function createStoreContext<T>() {
  const StoreContext = createContext<Store<T> | undefined>(undefined);

  const Provider: FC<PropsWithChildren<{ createStore: () => Store<T> }>> = ({
    createStore,
    children,
  }) => {
    const valueRef = useRef<Store<T>>();
    if (!valueRef.current) {
      valueRef.current = createStore();
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

  function useStoreMutation<U = unknown>(mutator: Mutator<T, U>) {
    const store = useStoreContext();
    return useMutation(store, mutator);
  }

  return [Provider, useStoreSelector, useStoreMutation] as const;
}

export { createStoreContext, createStore, create };
