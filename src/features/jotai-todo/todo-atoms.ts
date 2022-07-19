import { atom, PrimitiveAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { useCallback } from "react";

type Todo = {
  title: string;
  done: boolean;
};

export type TodoAtom = PrimitiveAtom<Todo>;

const todosAtom = atom<TodoAtom[]>([]);

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

export { todosAtom, todosAtomLength, addTodoAtom };
