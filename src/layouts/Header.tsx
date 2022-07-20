import { FC, memo, PropsWithChildren } from "react";
import { clsx } from "clsx";
import { Link, LinkProps } from "@tanstack/react-location";

const Header: FC = () => {
  return (
    <header className="flex p-8 space-x-8 ">
      <ActiveLink to="/zustand">Zustand To-Do</ActiveLink>

      <ActiveLink to="/jotai">Jotai To-Do</ActiveLink>

      <ActiveLink to="/valtio">Valtio To-Do</ActiveLink>

      <ActiveLink to="/subscribed">My Subscribed library</ActiveLink>
    </header>
  );
};

const ActiveLink: FC<PropsWithChildren<LinkProps>> = (props) => {
  return (
    <Link {...props}>
      {({ isActive: active }) => <ActiveLinkView active={active}>{props.children}</ActiveLinkView>}
    </Link>
  );
};

const ActiveLinkView: FC<PropsWithChildren<{ active: boolean }>> = memo(({ children, active }) => {
  return (
    <a
      className={clsx(
        "text-xl",
        active
          ? "text-neutral-800 font-bold"
          : "text-neutral-500 font-semibold hover:text-neutral-600"
      )}
    >
      {children}
    </a>
  );
});

ActiveLinkView.displayName = "ActiveLinkView";

export { Header };
