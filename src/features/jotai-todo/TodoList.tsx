import React, { FC, memo, useCallback, useRef, useState } from "react";
import { clsx } from "clsx";
import { useRenderCount } from "../../hooks/use-render-count";
import { GlobalTextDisplay } from "./GlobalText";
import { Provider, useAtom, useAtomValue } from "jotai";
import {
  addTodoAtom,
  TodoAtom,
  todosAtom,
  todosAtomLength,
  useRemoveTodo,
  useToggleTodo,
} from "./todo-atoms";
import { useUpdateAtom } from "jotai/utils";

const TodoList: FC<{ id: string }> = ({ id }) => {
  return (
    <Provider initialValues={[[todosAtom, []]]}>
      <div className="flex flex-col space-y-6">
        <TodoListView />
        <TodoListLength />
        <NewTodo />
        <GlobalTextDisplay />
      </div>
    </Provider>
  );
};

const TodoListView = () => {
  const todos = useAtomValue(todosAtom);

  return (
    <div className="flex-1 space-y-4">
      {todos.map((todo) => (
        <MemoedTodoItem key={todo.toString()} todo={todo} />
      ))}
    </div>
  );
};

const TodoItem: FC<{ todo: TodoAtom }> = ({ todo }) => {
  const { done, title } = useAtomValue(todo);
  const toggle = useToggleTodo(todo);
  const remove = useRemoveTodo(todo);

  return (
    <div className={clsx("flex justify-between rounded-md p-3 ", done ? "shadow-md" : "shadow-lg")}>
      <div className="flex space-x-4">
        <input type="checkbox" checked={done} onChange={toggle} />

        <div className={clsx("font-semibold", done && "line-through font-medium")}>{title}</div>
      </div>

      <button className="text-red-400 hover:text-red-500" onClick={remove}>
        Delete
      </button>
    </div>
  );
};

const MemoedTodoItem = memo(TodoItem);

const TodoListLength = () => {
  const length = useAtomValue(todosAtomLength);
  return <div>Length is: {length}</div>;
};

const NewTodo = () => {
  const addTodo = useUpdateAtom(addTodoAtom);
  const [text, setText] = useState("");

  const textRef = useRef(text);
  textRef.current = text;

  const onClick = useCallback(() => {
    if (!textRef.current) return;

    addTodo(textRef.current);
    setText("");
  }, [addTodo]);

  return (
    <div ref={useRenderCount("NewTodo")}>
      <div className="flex flex-row space-x-1">
        <input
          className="basis-3/4 border-2 border-gray-300 rounded-md p-1 w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="basis-1/4 bg-amber-200 rounded-md p-2 text-amber-800 hover:bg-amber-300"
          onClick={onClick}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export { TodoList };
