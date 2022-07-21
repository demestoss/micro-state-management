import create from "zustand";
import { SearchInput, SearchInputDisplay } from "../todo-core/SearchInput";

interface Store {
  text: string;
  setText: (text: string) => void;
  resetText: () => void;
}

const useSharedText = create<Store>((set) => ({
  text: "",
  setText: (text) => set({ text }),
  resetText: () => set({ text: "" }),
}));

const selectText = (state: Store) => state.text;
const selectSetText = (state: Store) => state.setText;
const selectResetText = (state: Store) => state.resetText;

const SharedTextInput = () => {
  const text = useSharedText(selectText);
  const setText = useSharedText(selectSetText);

  return (
    <SearchInput value={text} onChange={setText}>
      Zustand app
    </SearchInput>
  );
};

const SharedTextDisplay = () => {
  const text = useSharedText(selectText);
  const reset = useSharedText(selectResetText);

  return <SearchInputDisplay value={text} reset={reset} />;
};

export { SharedTextDisplay, SharedTextInput };
