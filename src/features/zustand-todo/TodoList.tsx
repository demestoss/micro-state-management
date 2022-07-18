import create, { StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { uniq } from "../../utils/uniq";
import createContext from "zustand/context";
import React, { FC, memo, useCallback, useId, useRef, useState } from "react";
import { clsx } from "clsx";
import { useRenderCount } from "../../hooks/use-render-count";
import { SharedTextDisplay } from "./SharedText";

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

interface StoreState {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const createTodoStore = (id: string) =>
  create<StoreState, [["zustand/persist", StoreState], ["zustand/immer", never]]>(
    persist(
      immer((set) => ({
        todos: [],
        addTodo: (title) =>
          set((state) => {
            state.todos.push({ title, done: false, id: uniq() });
          }),
        removeTodo: (id) =>
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          })),
        toggleTodo: (id) =>
          set((state) => {
            const todo = state.todos.find((todo) => todo.id === id)!;
            todo.done = !todo.done;
          }),
      })),
      {
        name: `todo-list-${id}`,
        getStorage: () => localStorage,
      }
    )
  );

const { Provider: TodoProvider, useStore: useTodoStore } = createContext<StoreApi<StoreState>>();

const selectTodos = (state: StoreState) => state.todos;
const selectTodosLength = (state: StoreState) => state.todos.length;
const selectAddTodo = (state: StoreState) => state.addTodo;
const selectRemoveTodo = (state: StoreState) => state.removeTodo;
const selectToggleTodo = (state: StoreState) => state.toggleTodo;

const TodoList: FC<{ id: string }> = ({ id }) => {
  return (
    <TodoProvider createStore={() => createTodoStore(id)}>
      <div className="flex flex-col space-y-6">
        <TodoListView />
        <TodoListLength />
        <NewTodo />
        <SharedTextDisplay />
      </div>
    </TodoProvider>
  );
};

const TodoListView = () => {
  const todos = useTodoStore(selectTodos);
  return (
    <div className="flex-1 space-y-4">
      {todos.map((todo) => (
        <MemoedTodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
};

const TodoItem: FC<{ id: string; title: string; done: boolean }> = ({ id, done, title }) => {
  const remove = useTodoStore(selectRemoveTodo);
  const toggle = useTodoStore(selectToggleTodo);

  return (
    <div className={clsx("flex justify-between rounded-md p-3 ", done ? "shadow-md" : "shadow-lg")}>
      <div className="flex space-x-4">
        <input type="checkbox" checked={done} onChange={() => toggle(id)} />

        <div className={clsx("font-semibold", done && "line-through font-medium")}>{title}</div>
      </div>

      <button className="text-red-400 hover:text-red-500" onClick={() => remove(id)}>
        Delete
      </button>
    </div>
  );
};

const MemoedTodoItem = memo(TodoItem);

const TodoListLength = () => {
  const length = useTodoStore(selectTodosLength);
  return <div>Length is: {length}</div>;
};

const NewTodo = () => {
  const addTodo = useTodoStore(selectAddTodo);
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
