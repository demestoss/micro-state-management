import { FC, PropsWithChildren } from "react";

const TodoListGrid: FC<PropsWithChildren> = ({ children }) => {
  return <div className="grid grid-cols-2 gap-8">{children}</div>;
};

export { TodoListGrid };
