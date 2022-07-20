import { FC, PropsWithChildren } from "react";
import create, { StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createContext from "zustand/context";
import { uniq } from "../../utils/uniq";

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

interface StoreState {
  todos: Todo[];
  addTodo: (item: { title: string }) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const createTodoStore = (id: string) =>
  create<StoreState, [["zustand/persist", StoreState], ["zustand/immer", never]]>(
    persist(
      immer((set) => ({
        todos: [],
        addTodo: ({ title }) =>
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

export const selectTodos = (state: StoreState) => state.todos;
export const selectTodosLength = (state: StoreState) => state.todos.length;
export const selectAddTodo = (state: StoreState) => state.addTodo;
export const selectRemoveTodo = (state: StoreState) => state.removeTodo;
export const selectToggleTodo = (state: StoreState) => state.toggleTodo;

const { Provider, useStore: useTodoStore } = createContext<StoreApi<StoreState>>();

const TodoProvider: FC<PropsWithChildren<{ id: string }>> = ({ id, children }) => {
  return <Provider createStore={() => createTodoStore(id)}>{children}</Provider>;
};

export { TodoProvider, useTodoStore };
