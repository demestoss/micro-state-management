import { atom, useAtomValue } from "jotai";
import { SubscribedTodoList } from "../features/subscribed-todo/SubscribedTodoList";
import { TodoListGrid } from "../features/todo-core/TodoListGrid";
import { SharedTextInput } from "../features/subscribed-todo/SharedText";

const todoIdListAtom = atom(() => ["subscribed-1", "subscribed-2"]);

const SubscribedApp = () => {
  const todoIdList = useAtomValue(todoIdListAtom);

  return (
    <div className="flex flex-col space-y-10 mx-auto">
      <SharedTextInput />

      <TodoListGrid>
        {todoIdList.map((id) => (
          <SubscribedTodoList key={id} id={id} />
        ))}
      </TodoListGrid>
    </div>
  );
};

export default SubscribedApp;
