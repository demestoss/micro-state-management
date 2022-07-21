import { atomWithReset, useResetAtom } from "jotai/utils";
import { globalAtomScope } from "../../pages/jotai-app";
import { useAtom, useAtomValue } from "jotai";
import { SearchInput, SearchInputDisplay } from "../todo-core/SearchInput";

const textAtom = atomWithReset("");

const GlobalTextInput = () => {
  const [text, setText] = useAtom(textAtom, globalAtomScope);

  return (
    <SearchInput value={text} onChange={setText}>
      Jotai app
    </SearchInput>
  );
};

const GlobalTextDisplay = () => {
  const text = useAtomValue(textAtom, globalAtomScope);
  const reset = useResetAtom(textAtom, globalAtomScope);

  return <SearchInputDisplay value={text} reset={reset} />;
};

export { GlobalTextDisplay, GlobalTextInput };
