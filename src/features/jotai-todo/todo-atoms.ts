import { atom, SetStateAction } from "jotai";
import { atomFamily, RESET, useUpdateAtom } from "jotai/utils";
import { useCallback } from "react";
import { atomWithLocalStorage } from "./atoms/atom-with-local-storage";
import { uniq } from "../../utils/uniq";
import { z } from "zod";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const TodoListSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    done: z.boolean(),
  })
);

const todosIdAtom = atom("todos-list");

const todosFamilyAtom = atomFamily((id: string) =>
  atomWithLocalStorage<Todo[]>([], id, TodoListSchema)
);

const todosAtom = atom(
  (get) => get(todosFamilyAtom(get(todosIdAtom))),
  (get, set, update: SetStateAction<Todo[]> | typeof RESET) =>
    set(todosFamilyAtom(get(todosIdAtom)), update)
);

const todosLengthAtom = atom((get) => get(todosAtom).length);

const addTodoAtom = atom(null, (get, set, item: { title: string }) =>
  set(todosAtom, [...get(todosAtom), { id: uniq("todo"), done: false, ...item }])
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

export { todosAtom, todosLengthAtom, addTodoAtom, todosIdAtom, removeTodoAtom, toggleTodoAtom };
