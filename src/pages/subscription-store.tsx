import { Button } from "../components/Button";
import { createStoreContext } from "../utils/subscribed";

interface Store {
  count: number;
  text: string;
}

const [Provider, useSelector, useMutation] = createStoreContext<Store>();

const Component1 = () => {
  const count = useSelector((s) => s.count);
  const increment = useMutation((prev) => ({ ...prev, count: prev.count + 1 }));
  const reset = useMutation((prev) => ({ ...prev, count: 0 }));

  return (
    <div className="flex flex-col space-y-4">
      <div>{count}</div>

      <div className="flex space-x-4">
        <Button variant="solid" color="success" onClick={increment}>
          +1
        </Button>
        <Button variant="outline" color="critical" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

const Component2 = () => {
  const visible = useSelector((s) => s.count === 5);

  return (
    <div className="flex flex-col">
      <span>Am I visible??</span>
      {visible && <span>Visible only if count === 5</span>}
    </div>
  );
};

const initialState = { count: 0, text: "Hello" };

const SubscriptionStore = () => (
  <Provider initialState={initialState}>
    <Component1 />
    <Component2 />
  </Provider>
);

export { SubscriptionStore };
