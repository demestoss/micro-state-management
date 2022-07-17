import { Redirect, Route, Switch } from "wouter";
import { ZustandTodo } from "./pages/zustand-todo";
import { PageContainer } from "./layouts/PageContainer";
import { SubscriptionStore } from "./pages/subscription-store";

const App = () => {
  return (
    <PageContainer>
      <Switch>
        <Route path="/zustand">
          <ZustandTodo />
        </Route>

        <Route path="/subscribed">
          <SubscriptionStore />
        </Route>

        <Redirect to="/zustand" />
      </Switch>
    </PageContainer>
  );
};

export default App;
