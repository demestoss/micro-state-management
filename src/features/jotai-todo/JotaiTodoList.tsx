import React, { FC, memo } from "react";
import { GlobalTextDisplay } from "./GlobalText";
import { Provider, useAtomValue } from "jotai";
import {
  addTodoAtom,
  todosAtom,
  todosLengthAtom,
  todosIdAtom,
  Todo,
  toggleTodoAtom,
  removeTodoAtom,
} from "./todo-atoms";
import { useUpdateAtom } from "jotai/utils";
import { CoreTodoList } from "../todo-core/CoreTodoList";
import { useEvent } from "../../hooks/use-event";

const JotaiTodoList: FC<{ id: string }> = ({ id }) => {
  return (
    <Provider initialValues={[[todosIdAtom, id]]}>
      <CoreTodoList.Container>
        <TodoListView />
        <TodoListLength />
        <CreateTodo />
        <GlobalTextDisplay />
      </CoreTodoList.Container>
    </Provider>
  );
};

const TodoListView = () => {
  const todos = useAtomValue(todosAtom);

  return (
    <CoreTodoList>
      {todos.map((todo) => (
        <MemoedTodoItem key={todo.id} todo={todo} />
      ))}
    </CoreTodoList>
  );
};

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {
  const toggle = useUpdateAtom(toggleTodoAtom);
  const remove = useUpdateAtom(removeTodoAtom);

  const removeEvent = useEvent(() => remove(todo.id));
  const toggleEvent = useEvent(() => toggle(todo.id));

  return (
    <CoreTodoList.Item
      title={todo.title}
      done={todo.done}
      remove={removeEvent}
      toggle={toggleEvent}
    />
  );
};

const MemoedTodoItem = memo(TodoItem);

const TodoListLength = () => {
  const length = useAtomValue(todosLengthAtom);

  return <CoreTodoList.Length length={length} />;
};

const CreateTodo = () => {
  const addTodo = useUpdateAtom(addTodoAtom);

  return <CoreTodoList.CreateTodo add={addTodo} />;
};

export { JotaiTodoList };
