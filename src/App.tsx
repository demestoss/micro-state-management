import { PageContainer } from "./layouts/PageContainer";
import { ReactLocation, Router, Outlet, Navigate, Route } from "@tanstack/react-location";

const reactLocation = new ReactLocation();

const routes: Route[] = [
  {
    path: "/",
    element: <Navigate to="/zustand" />,
  },
  {
    path: "/zustand",
    element: () => import("./pages/zustand-app").then((mod) => <mod.ZustandApp />),
  },
  {
    path: "/jotai",
    element: () => import("./pages/jotai-app").then((mod) => <mod.JotaiApp />),
  },
  {
    path: "/valtio",
    element: () => import("./pages/valtio-app").then((mod) => <mod.ValtioApp />),
  },
  {
    path: "/subscribed",
    element: () => import("./pages/subscription-store").then((mod) => <mod.SubscriptionStore />),
  },
  {
    element: <Navigate to="/zustand" />,
  },
];

const App = () => {
  return (
    <Router location={reactLocation} routes={routes}>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </Router>
  );
};

export default App;
