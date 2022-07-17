import { FC } from "react";
import { Link, LinkProps, useRoute } from "wouter";
import { cls } from "../utils/cls";

const Header: FC = () => {
  return (
    <header className="flex p-8 space-x-8 ">
      <ActiveLink href="/zustand">Zustand To-Do</ActiveLink>

      <ActiveLink href="/subscribed">My Subscribed library</ActiveLink>
    </header>
  );
};

const ActiveLink: FC<LinkProps> = (props) => {
  const { href = "", children } = props;
  const [active] = useRoute(href);

  return (
    <Link {...props}>
      <a
        className={cls(
          "text-xl hover:text-neutral-600 bg ",
          active ? "text-neutral-800 font-bold" : "text-neutral-500 font-semibold "
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export { Header };
