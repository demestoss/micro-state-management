import { TodoListGrid } from "../features/todo-core/TodoListGrid";
import { SearchTextInput } from "../features/valtio-todo/SearchText";
import { ValtioTodoList } from "../features/valtio-todo/ValtioTodoList";

const ValtioApp = () => {
  return (
    <div className="flex flex-col space-y-10 mx-auto">
      <SearchTextInput />

      <TodoListGrid>
        <ValtioTodoList id={"ds"} />
      </TodoListGrid>
    </div>
  );
};

export { ValtioApp };
