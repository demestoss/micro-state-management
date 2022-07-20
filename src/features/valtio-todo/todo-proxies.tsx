import { proxy, useSnapshot } from "valtio";
import { uniq } from "../../utils/uniq";
import { localStorageProxy } from "./proxies/localStorageProxy";
import { z } from "zod";
import { createContext, FC, PropsWithChildren, useRef } from "react";
import { createProxyContext } from "./proxies/createProxyContext";
import { derive } from "valtio/utils";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

interface StoreState {
  todos: Todo[];
}

interface State extends StoreState {
  addTodo: (item: { title: string }) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  showText: boolean;
}

const TodoListSchema = z.object({
  todos: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      done: z.boolean(),
    })
  ),
});

function createTodoProxy(id: string) {
  const todosState = localStorageProxy<StoreState>(
    {
      todos: [],
    },
    { key: id, schema: TodoListSchema }
  );

  return derive<StoreState, State>({
    todos: (get) => get(todosState).todos,

    addTodo: (get) => (item) => {
      get(todosState).todos.push({
        id: uniq("todo"),
        done: false,
        ...item,
      });
    },

    removeTodo: (get) => (id) => {
      get(todosState).todos = get(todosState).todos.filter((todo) => todo.id !== id);
    },

    toggleTodo: (get) => (id) => {
      const todo = get(todosState).todos.find((todo) => todo.id === id);
      if (todo) {
        todo.done = !todo.done;
      }
    },

    showText: (get) => get(todosState).todos.length > 2,
  });
}

const [Provider, useTodoList] = createProxyContext<State>();

const TodoListProvider: FC<PropsWithChildren<{ id: string }>> = ({ id, children }) => {
  return <Provider createProxy={() => createTodoProxy(id)}>{children}</Provider>;
};

// Kinda tricky thing
// We need to access global state without snapshot first, and then create snapshot of item, thatwe find
// But it works, and valtio shows the best performance for this case
const useTodoItem = (id: string) => {
  const state = useTodoList();
  const todoState = state.todos.find((todo) => todo.id === id)!;
  return useSnapshot(todoState);
};

export { TodoListProvider, useTodoItem, useTodoList };
