import { atom, WritableAtom } from "jotai";

function atomWithLocalStorage<T>(initialValue: T, key: string) {
  const localData = window.localStorage.getItem(key);
  let parsedData;
  try {
    parsedData = JSON.parse(localData ?? "");
  } catch (e) {
    parsedData = undefined;
  }

  const initial = (parsedData && getAtomizedValue(parsedData)) || initialValue;

  const anAtom = atom(initial, (get, set, nextValue: T | ((p: T) => T)) => {
    set(anAtom, nextValue);
    window.localStorage.setItem(key, JSON.stringify(get(anAtom)));
  });

  return anAtom as WritableAtom<T, T | ((p: T) => T)>;
}

// Works only for basic atoms I guess
function getAtomizedValue(value: any): any {
  if (typeof value !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((el) => getAtomizedValue(el));
  }

  return value.init ? atom(value.init) : value;
}

export { atomWithLocalStorage };
