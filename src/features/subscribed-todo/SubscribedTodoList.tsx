import React, { FC, memo } from "react";
import { CoreTodoList } from "../todo-core/CoreTodoList";
import { SharedTextDisplay } from "./SharedText";
import { Todo, TodoListProvider, useTodoList, useTodoListMutation } from "./subscribed-state";
import { uniq } from "../../utils/uniq";

const SubscribedTodoList: FC<{ id: string }> = ({ id }) => {
  return (
    <TodoListProvider id={id}>
      <CoreTodoList.Container>
        <TodoListView />
        <TodoListLength />
        <CreateTodo />
        <SharedTextDisplay />
        <TodoListText />
      </CoreTodoList.Container>
    </TodoListProvider>
  );
};

const TodoListView = () => {
  const todos = useTodoList((state) => state.todos);

  return (
    <CoreTodoList>
      {todos.map((todo) => (
        <MemoedTodoItem key={todo.id} todo={todo} />
      ))}
    </CoreTodoList>
  );
};

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {
  const { id, title, done } = todo;

  const remove = useTodoListMutation((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  }));
  const toggle = useTodoListMutation((state) => ({
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
  }));

  return <CoreTodoList.Item title={title} done={done} remove={remove} toggle={toggle} />;
};

const MemoedTodoItem = memo(TodoItem);

const TodoListLength = () => {
  const length = useTodoList((state) => state.todos.length);

  return <CoreTodoList.Length length={length} />;
};

const CreateTodo = () => {
  const addTodo = useTodoListMutation((state, item: { title: string }) => ({
    todos: [...state.todos, { id: uniq(), title: item.title, done: false }],
  }));

  return <CoreTodoList.CreateTodo add={addTodo} />;
};

const TodoListText = () => {
  const showText = useTodoList((state) => state.todos.length > 2);

  return <div>{showText && <span>Length is greater than 2</span>}</div>;
};

export { SubscribedTodoList };
