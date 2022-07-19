import { atomWithReset } from "jotai/utils";
import { useGlobalAtom, useGlobalAtomValue, useGlobalResetAtom } from "../../pages/jotai-app";

const textAtom = atomWithReset("");

const GlobalTextInput = () => {
  const [text, setText] = useGlobalAtom(textAtom);

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-xl text-center">Global Text</div>
      <input
        className="border-2 border-gray-300 rounded-md p-1 w-full"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

const GlobalTextDisplay = () => {
  const text = useGlobalAtomValue(textAtom);
  const reset = useGlobalResetAtom(textAtom);

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

export { GlobalTextDisplay, GlobalTextInput };
