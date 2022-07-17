import { ZustandTodo } from "./pages/zustand-todo";
import { PageContainer } from "./layouts/PageContainer";
import { SubscriptionStore } from "./pages/subscription-store";

const App = () => {
    return <PageContainer>
        <ZustandTodo/>
        <SubscriptionStore />
    </PageContainer>
}

export default App;
