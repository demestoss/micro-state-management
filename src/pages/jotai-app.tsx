import React from "react";
import { GlobalTextInput } from "../features/jotai-todo/GlobalText";
import { JotaiTodoList } from "../features/jotai-todo/JotaiTodoList";
import { atom, Provider, useAtomValue } from "jotai";
import { TodoListGrid } from "../features/todo-core/TodoListGrid";

const todoIdListAtom = atom(() => ["third", "forth"]);

const JotaiApp = () => {
  const todoIdList = useAtomValue(todoIdListAtom);

  return (
    <Provider scope={globalAtomScope}>
      <div className="flex flex-col space-y-10 mx-auto">
        <GlobalTextInput />

        <TodoListGrid>
          {todoIdList.map((id) => (
            <JotaiTodoList key={id} id={id} />
          ))}
        </TodoListGrid>
      </div>
    </Provider>
  );
};

const globalAtomScope = Symbol("global");

export { JotaiApp, globalAtomScope };
