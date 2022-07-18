import { Redirect, Route, Switch } from "wouter";
import { ZustandApp } from "./pages/zustand-app";
import { PageContainer } from "./layouts/PageContainer";
import { SubscriptionStore } from "./pages/subscription-store";

const App = () => {
  return (
    <PageContainer>
      <Switch>
        <Route path="/zustand">
          <ZustandApp />
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
