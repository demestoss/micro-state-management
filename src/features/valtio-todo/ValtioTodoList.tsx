import React, { FC, memo } from "react";
import { SearchTextDisplay } from "./SearchText";
import { CoreTodoList } from "../todo-core/CoreTodoList";
import { useEvent } from "../../hooks/use-event";
import { addTodo, removeTodo, todosState, toggleTodo, useTodoItem } from "./todo-proxies";
import { useSnapshot } from "valtio";
import { derive } from "valtio/utils";

const ValtioTodoList: FC<{ id: string }> = ({ id }) => {
  return (
    <CoreTodoList.Container>
      <TodoListView />
      <TodoListLength />
      <CreateTodo />
      <SearchTextDisplay />
      <TodoListText />
    </CoreTodoList.Container>
  );
};

const TodoListView = () => {
  const { todos } = useSnapshot(todosState);
  const todoIds = todos.map((todo) => todo.id);

  return (
    <CoreTodoList>
      {todoIds.map((id) => (
        <MemoedTodoItem key={id} id={id} />
      ))}
    </CoreTodoList>
  );
};

const TodoItem: FC<{ id: string }> = ({ id }) => {
  const { title, done } = useTodoItem(id);

  const removeEvent = useEvent(() => removeTodo(id));
  const toggleEvent = useEvent(() => toggleTodo(id));

  return <CoreTodoList.Item title={title} done={done} remove={removeEvent} toggle={toggleEvent} />;
};

const MemoedTodoItem = memo(TodoItem);

const TodoListLength = () => {
  const { todos } = useSnapshot(todosState);

  return <CoreTodoList.Length length={todos.length} />;
};

// Conditional proxies creating 🎉
const derived = derive({
  showText: (get) => get(todosState).todos.length > 2,
});

const TodoListText = () => {
  const { showText } = useSnapshot(derived);

  return <div>{showText && <span>Length is greater than 2</span>}</div>;
};

const CreateTodo = () => {
  return <CoreTodoList.CreateTodo add={addTodo} />;
};

export { ValtioTodoList };
