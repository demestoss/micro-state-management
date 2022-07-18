import create from "zustand";

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
    <div className="flex flex-col space-y-4">
      <div className="text-xl text-center">Shared Text</div>
      <input
        className="border-2 border-gray-300 rounded-md p-1 w-full"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

const SharedTextDisplay = () => {
  const text = useSharedText(selectText);
  const reset = useSharedText(selectResetText);

  if (!text) return null;

  return (
    <div className="space-x-2">
      <span>{text}</span>

      <button className="text-red-400 hover:text-red-500" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export { SharedTextDisplay, SharedTextInput };
