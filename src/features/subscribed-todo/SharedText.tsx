import { SearchInput, SearchInputDisplay } from "../todo-core/SearchInput";
import { create } from "./utils/subscribed";

interface State {
  text: string;
}

const [useTextState, useTextMutation] = create<State>({ text: "" });

const SharedTextInput = () => {
  const text = useTextState((state) => state.text);
  const setText = useTextMutation((state, text: string) => ({
    text,
  }));

  return (
    <SearchInput value={text} onChange={setText}>
      Subscribed app
    </SearchInput>
  );
};

const SharedTextDisplay = () => {
  const text = useTextState((state) => state.text);
  const reset = useTextMutation((state: State) => ({ ...state, text: "" }));

  return <SearchInputDisplay value={text} reset={reset} />;
};

export { SharedTextInput, SharedTextDisplay };
