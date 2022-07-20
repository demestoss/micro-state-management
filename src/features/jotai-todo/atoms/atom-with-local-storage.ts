import { atom, SetStateAction, WritableAtom } from "jotai";
import { RESET } from "jotai/utils";
import { parseValueFromStorage, Schema } from "../../../utils/parseValueFromStorage";

interface StoreOptions {
  key: string;
  schema?: Schema;
  storage?: Storage;
}

// Own implementation of atomWithStorage
// The origin atom from jotai does not work for me :\
function atomWithLocalStorage<T>(initialValue: T, options: StoreOptions) {
  const { key, schema, storage = window.localStorage } = options;

  const initial = parseValueFromStorage({ key, schema, initial: initialValue, storage });

  const baseAtom = atom(initial);

  const anAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: SetStateAction<T> | typeof RESET) => {
      if (update === RESET) {
        set(baseAtom, initialValue);
        return storage.removeItem(key);
      }

      set(baseAtom, update);
      storage.setItem(key, JSON.stringify(get(anAtom)));
    }
  );

  return anAtom as WritableAtom<T, SetStateAction<T> | typeof RESET>;
}

export { atomWithLocalStorage };
