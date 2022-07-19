import { atom, PrimitiveAtom } from "jotai";
import { atomFamily, useUpdateAtom } from "jotai/utils";
import { useCallback } from "react";
import { atomWithLocalStorage } from "./atoms/atom-with-local-storage";

type Todo = {
  title: string;
  done: boolean;
};

export type TodoAtom = PrimitiveAtom<Todo>;

const todosIdAtom = atom("todos-list");

const todosFamilyAtom = atomFamily((id: string) => atomWithLocalStorage<TodoAtom[]>([], id));

const todosAtom = atom(
  (get) => get(todosFamilyAtom(get(todosIdAtom))),
  (get, set, nextValue: TodoAtom[] | ((p: TodoAtom[]) => TodoAtom[])) => {
    const val =
      typeof nextValue === "function"
        ? nextValue(get(todosFamilyAtom(get(todosIdAtom))))
        : nextValue;
    set(todosFamilyAtom(get(todosIdAtom)), val);
  }
);

const todosAtomLength = atom((get) => get(todosAtom).length);

const addTodoAtom = atom(null, (get, set, title: string) =>
  set(todosAtom, [...get(todosAtom), atom({ title, done: false })])
);

export function useToggleTodo(todoAtom: TodoAtom) {
  const setTodo = useUpdateAtom(todoAtom);
  return useCallback(() => setTodo((todo) => ({ ...todo, done: !todo.done })), [setTodo]);
}

export function useRemoveTodo(todoAtom: TodoAtom) {
  const setTodos = useUpdateAtom(todosAtom);
  return useCallback(
    () => setTodos((prev) => prev.filter((i) => i !== todoAtom)),
    [setTodos, todoAtom]
  );
}

export { todosAtom, todosAtomLength, addTodoAtom, todosIdAtom };
