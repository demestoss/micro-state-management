import React from "react";
import { GlobalTextInput } from "../features/jotai-todo/GlobalText";
import { TodoList } from "../features/jotai-todo/TodoList";

const JotaiApp = () => {
  return (
    <div className="flex flex-col space-y-10 mx-auto">
      <GlobalTextInput />

      <div className="grid grid-cols-2 gap-8">
        <TodoList />
      </div>
    </div>
  );
};

export { JotaiApp };
