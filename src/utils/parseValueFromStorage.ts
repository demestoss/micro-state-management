interface Options<T> {
  initial: T;
  key: string;
  schema?: Schema;
  storage?: Storage;
}

export type Schema = { safeParse: (s: string) => { success: boolean } };

function parseValueFromStorage<T>(options: Options<T>): T {
  const { key, schema, storage = window.localStorage, initial } = options;

  const localData = storage.getItem(key);
  let parsedData;
  try {
    parsedData = JSON.parse(localData ?? "");
  } catch (e) {
    parsedData = undefined;
  }

  const isValid = schema ? schema.safeParse(parsedData).success : true;

  return (isValid && parsedData) || initial;
}

export { parseValueFromStorage };
