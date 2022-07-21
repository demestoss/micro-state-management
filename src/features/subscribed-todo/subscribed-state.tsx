import { createStoreContext, createStore } from "./utils/subscribed";
import { FC, PropsWithChildren } from "react";
import { z } from "zod";
import { persistStore } from "./utils/persistStore";

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

interface State {
  todos: Todo[];
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

const createTodoListStore = (id: string) =>
  persistStore(
    createStore<State>({
      todos: [],
    }),
    { key: id, schema: TodoListSchema }
  );

const [Provider, useTodoList, useTodoListMutation] = createStoreContext<State>();

const TodoListProvider: FC<PropsWithChildren<{ id: string }>> = ({ id, children }) => {
  return <Provider createStore={() => createTodoListStore(id)}>{children}</Provider>;
};

export { TodoListProvider, useTodoList, useTodoListMutation };
