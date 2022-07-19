import React from "react";
import { GlobalTextInput } from "../features/jotai-todo/GlobalText";
import { TodoList } from "../features/jotai-todo/TodoList";
import { atom, Provider, useAtomValue } from "jotai";

const todoIdListAtom = atom(() => ["third", "forth"]);

const JotaiApp = () => {
  const todoIdList = useAtomValue(todoIdListAtom);

  return (
    <Provider scope={globalAtomScope}>
      <div className="flex flex-col space-y-10 mx-auto">
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

const globalAtomScope = Symbol("global");

export { JotaiApp, globalAtomScope };
