import React, { FC, memo, PropsWithChildren, useState } from "react";
import { useRenderCount } from "../../hooks/use-render-count";
import { useEvent } from "../../hooks/use-event";
import { clsx } from "clsx";
import { Input } from "../../components/Input";
import { MemoedButton } from "../../components/Button";

namespace CoreTodoList {
  export interface StaticComponents {
    Container: FC<PropsWithChildren>;
    Item: FC<TodoItem.Props>;
    CreateTodo: FC<CreateTodo.Props>;
    Length: FC<{ length: number }>;
  }
}

const CoreTodoList: FC<PropsWithChildren> & CoreTodoList.StaticComponents = ({ children }) => {
  return <div className="flex-1 space-y-4">{children}</div>;
};

const TodoListContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col space-y-6">{children}</div>;
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

      <MemoedButton variant="inline" color="critical" onClick={remove}>
        Delete
      </MemoedButton>
    </div>
  );
});

TodoItem.displayName = "TodoItem";

const TodoListLength: FC<{ length: number }> = ({ length }) => {
  return <div>Length is: {length}</div>;
};

namespace CreateTodo {
  export interface Props {
    add: (item: { title: string }) => void;
  }
}

const CreateTodo: FC<CreateTodo.Props> = ({ add }) => {
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
          <MemoedButton onClick={onClick}>Add</MemoedButton>
        </div>
      </div>
    </div>
  );
};

CoreTodoList.Container = TodoListContainer;
CoreTodoList.Item = TodoItem;
CoreTodoList.CreateTodo = CreateTodo;
CoreTodoList.Length = TodoListLength;

export { CoreTodoList };
