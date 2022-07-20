import { parseValueFromStorage, Schema } from "../../../utils/parseValueFromStorage";
import { proxy, subscribe } from "valtio";

interface StoreOptions {
  key: string;
  schema?: Schema;
  storage?: Storage;
}

function localStorageProxy<State extends object>(initialValue: State, options: StoreOptions) {
  const { key, schema, storage = window.localStorage } = options;

  const initial = parseValueFromStorage({ key, schema, initial: initialValue, storage });

  console.log("initial", initial);
  const state = proxy(initial);

  subscribe(state, () => {
    storage.setItem(key, JSON.stringify(state));
  });

  return state;
}

export { localStorageProxy };
