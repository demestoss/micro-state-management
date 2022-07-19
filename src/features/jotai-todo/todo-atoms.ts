import { atom } from "jotai";
import { atomFamily, useUpdateAtom } from "jotai/utils";
import { useCallback } from "react";
import { atomWithLocalStorage } from "./atoms/atom-with-local-storage";
import { uniq } from "../../utils/uniq";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const todosIdAtom = atom("todos-list");

const todosFamilyAtom = atomFamily((id: string) => atomWithLocalStorage<Todo[]>([], id));

const todosAtom = atom(
  (get) => get(todosFamilyAtom(get(todosIdAtom))),
  (get, set, nextValue: Todo[] | ((p: Todo[]) => Todo[])) => {
    const val =
      typeof nextValue === "function"
        ? nextValue(get(todosFamilyAtom(get(todosIdAtom))))
        : nextValue;
    set(todosFamilyAtom(get(todosIdAtom)), val);
  }
);

const todosLengthAtom = atom((get) => get(todosAtom).length);

const addTodoAtom = atom(null, (get, set, title: string) =>
  set(todosAtom, [...get(todosAtom), { id: uniq("todo"), title, done: false }])
);

const removeTodoAtom = atom(null, (get, set, id: string) =>
  set(
    todosAtom,
    get(todosAtom).filter((todo) => todo.id !== id)
  )
);

const toggleTodoAtom = atom(null, (get, set, id: string) =>
  set(
    todosAtom,
    get(todosAtom).map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
  )
);

function useToggleTodo(todoId: string) {
  const toggle = useUpdateAtom(toggleTodoAtom);
  return useCallback(() => toggle(todoId), [toggle, todoId]);
}

function useRemoveTodo(todoId: string) {
  const remove = useUpdateAtom(removeTodoAtom);
  return useCallback(() => remove(todoId), [remove, todoId]);
}

export { todosAtom, todosLengthAtom, addTodoAtom, todosIdAtom, useRemoveTodo, useToggleTodo };
