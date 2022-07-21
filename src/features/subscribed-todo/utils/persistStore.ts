import { Store } from "./subscribed";
import { parseValueFromStorage, Schema } from "../../../utils/parseValueFromStorage";

interface StoreOptions {
  key: string;
  schema?: Schema;
  storage?: Storage;
}

function persistStore<T>(store: Store<T>, options: StoreOptions) {
  const { key, schema, storage = window.localStorage } = options;

  const initial = parseValueFromStorage({ key, schema, initial: store.get(), storage });

  // It's not optimal solution due to we set initial value twice
  store.set(initial);

  store.subscribe((state) => {
    storage.setItem(key, JSON.stringify(state));
  });

  return store;
}

export { persistStore };
