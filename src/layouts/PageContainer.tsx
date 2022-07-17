import { FC, ReactNode } from "react";
import { Header } from "./Header";

const PageContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />

      <div className="mx-auto w-6/12 mt-5">{children}</div>
    </div>
  );
};

export { PageContainer };
