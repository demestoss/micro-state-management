import React, { FC, memo, PropsWithChildren, useState } from "react";
import { useRenderCount } from "../../hooks/use-render-count";
import { useEvent } from "../../hooks/use-event";
import { clsx } from "clsx";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const TodoListContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className="flex flex-col space-y-6">{children}</div>;
};

const TodoListView: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className="flex-1 space-y-4">{children}</div>;
};

namespace TodoItem {
  export interface Props {
    title: string;
    done: boolean;
    remove: () => void;
    toggle: () => void;
  }
}

const TodoItem: FC<TodoItem.Props> = memo(({ title, done, toggle, remove }) => {
  return (
    <div className={clsx("flex justify-between rounded-md p-3 ", done ? "shadow-md" : "shadow-lg")}>
      <div className="flex space-x-4">
        <input type="checkbox" checked={done} onChange={toggle} />

        <div className={clsx("font-semibold", done && "line-through font-medium")}>{title}</div>
      </div>

      <Button variant="inline" color="critical" onClick={remove}>
        Delete
      </Button>
    </div>
  );
});

TodoItem.displayName = "TodoItem";

const TodoListLength: FC<{ length: number }> = ({ length }) => {
  return <div>Length is: {length}</div>;
};

namespace NewTodo {
  export interface Props {
    add: (item: { title: string }) => void;
  }
}

const NewTodo: FC<NewTodo.Props> = ({ add }) => {
  const [text, setText] = useState("");

  const onClick = useEvent(() => {
    if (!text) return;

    add({ title: text });
    setText("");
  });

  return (
    <div ref={useRenderCount("NewTodo")}>
      <div className="flex flex-row space-x-1">
        <div className="basis-3/4">
          <Input value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div className="basis-1/4">
          <Button onClick={onClick}>Add</Button>
        </div>
      </div>
    </div>
  );
};

export { TodoListContainer, TodoListView, TodoItem, TodoListLength, NewTodo };
