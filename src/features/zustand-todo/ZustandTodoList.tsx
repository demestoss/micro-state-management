import React, { FC, memo } from "react";
import {
  selectAddTodo,
  selectRemoveTodo,
  selectTodos,
  selectTodosLength,
  selectToggleTodo,
  Todo,
  TodoProvider,
  useTodoStore,
} from "./todo-store";
import { SharedTextDisplay } from "./SharedText";
import { CoreTodoList } from "../todo-core/CoreTodoList";
import { useEvent } from "../../hooks/use-event";

const ZustandTodoList: FC<{ id: string }> = ({ id }) => {
  return (
    <TodoProvider id={id}>
      <CoreTodoList.Container>
        <TodoListView />
        <TodoListLength />
        <CreateTodo />
        <SharedTextDisplay />
        <TodoListText />
      </CoreTodoList.Container>
    </TodoProvider>
  );
};

const TodoListView = () => {
  const todos = useTodoStore(selectTodos);

  return (
    <CoreTodoList>
      {todos.map((todo) => (
        <MemoedTodoItem key={todo.id} todo={todo} />
      ))}
    </CoreTodoList>
  );
};

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {
  const remove = useTodoStore(selectRemoveTodo);
  const toggle = useTodoStore(selectToggleTodo);

  const removeEvent = useEvent(() => remove(todo.id));
  const toggleEvent = useEvent(() => toggle(todo.id));

  return (
    <CoreTodoList.Item
      title={todo.title}
      done={todo.done}
      remove={removeEvent}
      toggle={toggleEvent}
    />
  );
};

const MemoedTodoItem = memo(TodoItem);

const TodoListLength = () => {
  const length = useTodoStore(selectTodosLength);

  return <CoreTodoList.Length length={length} />;
};

const CreateTodo = () => {
  const addTodo = useTodoStore(selectAddTodo);

  return <CoreTodoList.CreateTodo add={addTodo} />;
};

const TodoListText = () => {
  const showText = useTodoStore((state) => state.todos.length > 2);

  return <div>{showText && <span>Length is greater than 2</span>}</div>;
};

export { ZustandTodoList };
