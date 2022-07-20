import React, { FC } from "react";
import { ZustandTodoList } from "../features/zustand-todo/ZustandTodoList";
import { SharedTextInput } from "../features/zustand-todo/SharedText";
import { atom, useAtomValue } from "jotai";
import { TodoListGrid } from "../features/todo-core/TodoListGrid";

const todoIdListAtom = atom(() => ["first", "second"]);

const ZustandApp: FC = () => {
  const todoIdList = useAtomValue(todoIdListAtom);

  return (
    <div className="flex flex-col space-y-10 mx-auto">
      <SharedTextInput />

      <TodoListGrid>
        {todoIdList.map((id) => (
          <ZustandTodoList key={id} id={id} />
        ))}
      </TodoListGrid>
    </div>
  );
};

export { ZustandApp };
