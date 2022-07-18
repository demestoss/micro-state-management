import { z } from "zod";
import { atom } from "jotai";

function atomWithLocalStorage<T>(initialValue: T, key: string, schema?: z.Schema) {
  const localData = window.localStorage.getItem(key);
  let parsedData;
  try {
    parsedData = JSON.parse(localData ?? "{}");
  } catch (e) {
    parsedData = {};
  }

  const { success = true } = schema?.safeParse(parsedData) || {};
  const initial = success ? parsedData : initialValue;

  const anAtom = atom(initial, (get, set, nextValue: T) => {
    set(anAtom, nextValue);
    window.localStorage.setItem(key, JSON.stringify(get(anAtom)));
  });

  return anAtom;
}

export { atomWithLocalStorage };
