import React, { FC } from "react";
import { TodoList } from "../features/zustand-todo/TodoList";
import { SharedTextInput } from "../features/zustand-todo/SharedText";
import { atom, useAtomValue } from "jotai";

const todoIdListAtom = atom(() => ["first", "second"]);

const ZustandApp: FC = () => {
  const todoIdList = useAtomValue(todoIdListAtom);

  return (
    <div className="flex flex-col space-y-10 mx-auto">
      <SharedTextInput />

      <div className="grid grid-cols-2 gap-8">
        {todoIdList.map((id) => (
          <TodoList key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export { ZustandApp };
