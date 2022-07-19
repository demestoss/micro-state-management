import { atomWithReset, useResetAtom } from "jotai/utils";
import { globalAtomScope } from "../../pages/jotai-app";
import { useAtom, useAtomValue } from "jotai";

const textAtom = atomWithReset("");

const GlobalTextInput = () => {
  const [text, setText] = useAtom(textAtom, globalAtomScope);

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
  const text = useAtomValue(textAtom, globalAtomScope);
  const reset = useResetAtom(textAtom, globalAtomScope);

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
