import React from "react";
import { GlobalTextInput } from "../features/jotai-todo/GlobalText";
import { TodoList } from "../features/jotai-todo/TodoList";
import { atom, Provider, useAtom, useAtomValue, WritableAtom } from "jotai";
import { RESET, useResetAtom } from "jotai/utils";

const todoIdListAtom = atom(() => ["third", "forth"]);

const JotaiApp = () => {
  const todoIdList = useAtomValue(todoIdListAtom);

  return (
    <Provider scope="global">
      <div className="flex flex-col space-y-10 mx-auto">
        <div className="text-center text-red-300">
          Unfortnatelly I cannot beat localStorage persist for this case :(
        </div>

        <GlobalTextInput />

        <div className="grid grid-cols-2 gap-8">
          {todoIdList.map((id) => (
            <TodoList key={id} id={id} />
          ))}
        </div>
      </div>
    </Provider>
  );
};

function useGlobalAtom<T, S>(atom: WritableAtom<T, S>) {
  return useAtom(atom, "global");
}

function useGlobalAtomValue<T, S>(atom: WritableAtom<T, S>) {
  return useAtomValue(atom, "global");
}

function useGlobalResetAtom<T>(
  atom: WritableAtom<string, string | typeof RESET | ((prev: string) => string)>
) {
  return useResetAtom(atom, "global");
}

export { JotaiApp, useGlobalAtom, useGlobalAtomValue, useGlobalResetAtom };
