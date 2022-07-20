import { TodoListGrid } from "../features/todo-core/TodoListGrid";
import { SearchTextInput } from "../features/valtio-todo/SearchText";
import { ValtioTodoList } from "../features/valtio-todo/ValtioTodoList";
import { atom, useAtomValue } from "jotai";

const todoIdListAtom = atom(() => ["valtio-1", "valtio-2"]);

const ValtioApp = () => {
  const todoIdList = useAtomValue(todoIdListAtom);

  return (
    <div className="flex flex-col space-y-10 mx-auto">
      <SearchTextInput />

      <TodoListGrid>
        {todoIdList.map((id) => (
          <ValtioTodoList key={id} id={id} />
        ))}
      </TodoListGrid>
    </div>
  );
};

export { ValtioApp };
