import React, { FC, memo } from "react";
import { SearchTextDisplay } from "./SearchText";
import { CoreTodoList } from "../todo-core/CoreTodoList";
import { useEvent } from "../../hooks/use-event";
import { useTodoList, TodoListProvider, useTodoItem } from "./todo-proxies";
import { useSnapshot } from "valtio";

const ValtioTodoList: FC<{ id: string }> = ({ id }) => {
  return (
    <TodoListProvider id={id}>
      <CoreTodoList.Container>
        <TodoListView />
        <TodoListLength />
        <CreateTodo />
        <SearchTextDisplay />
        <TodoListText />
      </CoreTodoList.Container>
    </TodoListProvider>
  );
};

const TodoListView = () => {
  const state = useTodoList();
  const { todos } = useSnapshot(state);
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
  const { removeTodo, toggleTodo } = useTodoList();
  const { title, done } = useTodoItem(id);

  const removeEvent = useEvent(() => removeTodo(id));
  const toggleEvent = useEvent(() => toggleTodo(id));

  return <CoreTodoList.Item title={title} done={done} remove={removeEvent} toggle={toggleEvent} />;
};

const MemoedTodoItem = memo(TodoItem);

const TodoListLength = () => {
  const state = useTodoList();
  const { todos } = useSnapshot(state);

  return <CoreTodoList.Length length={todos.length} />;
};

const TodoListText = () => {
  const state = useTodoList();
  const { showText } = useSnapshot(state);

  return <div>{showText && <span>Length is greater than 2</span>}</div>;
};

const CreateTodo = () => {
  const { addTodo } = useTodoList();
  return <CoreTodoList.CreateTodo add={addTodo} />;
};

export { ValtioTodoList };
