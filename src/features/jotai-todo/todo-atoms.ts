import { atom } from "jotai";
import { uniq } from "../../utils/uniq";
import { withImmer } from "jotai/immer";
import { z } from "zod";
import { atomWithLocalStorage } from "./utils/atom-with-local-storage";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const TodoSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    done: z.boolean(),
  })
);

const todosAtom = withImmer(atomWithLocalStorage<Todo[]>([], "jotai-todo", TodoSchema));

const todosAtomLength = atom((get) => get(todosAtom).length);

namespace TodosActions {
  export const addTodo = atom(null, (get, set, title: string) =>
    set(todosAtom, (state) => {
      state.push({ id: uniq(), title, done: false });
    })
  );

  export const removeTodo = atom(null, (get, set, id: string) =>
    set(
      todosAtom,
      get(todosAtom).filter((todo) => todo.id !== id)
    )
  );

  export const toggleTodo = atom(null, (get, set, id: string) =>
    set(todosAtom, (state) =>
      state.forEach((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      })
    )
  );
}

export { todosAtom, todosAtomLength, TodosActions };
