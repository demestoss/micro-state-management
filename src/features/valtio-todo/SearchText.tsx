import { proxy, useSnapshot } from "valtio";
import { SearchInput, SearchInputDisplay } from "../todo-core/SearchInput";

const textState = proxy({ text: "" });

const setText = (text: string) => {
  textState.text = text;
};

const reset = () => {
  textState.text = "";
};

const SearchTextInput = () => {
  const state = useSnapshot(textState, { sync: true });

  return <SearchInput value={state.text} onChange={setText} />;
};

const SearchTextDisplay = () => {
  const state = useSnapshot(textState);

  return <SearchInputDisplay value={state.text} reset={reset} />;
};

export { SearchTextInput, SearchTextDisplay };
