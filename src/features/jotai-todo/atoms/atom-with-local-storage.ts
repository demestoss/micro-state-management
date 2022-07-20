import { atom, SetStateAction, WritableAtom } from "jotai";
import { RESET } from "jotai/utils";

type Schema = { safeParse: (s: string) => { success: boolean } };

// Own implementation of atomWithStorage
// The origin atom from jotai does not work for me :\
function atomWithLocalStorage<T>(initialValue: T, key: string, schema?: Schema) {
  const localData = window.localStorage.getItem(key);
  let parsedData;
  try {
    parsedData = JSON.parse(localData ?? "");
  } catch (e) {
    parsedData = undefined;
  }

  const isValid = schema ? schema.safeParse(parsedData).success : true;

  const initial: T = (isValid && parsedData) || initialValue;

  const baseAtom = atom(initial);

  const anAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: SetStateAction<T> | typeof RESET) => {
      if (update === RESET) {
        set(baseAtom, initialValue);
        return window.localStorage.removeItem(key);
      }

      set(baseAtom, update);
      window.localStorage.setItem(key, JSON.stringify(get(anAtom)));
    }
  );

  return anAtom as WritableAtom<T, SetStateAction<T> | typeof RESET>;
}

export { atomWithLocalStorage };
