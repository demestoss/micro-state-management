import { createStoreContext } from "../lib/subscribed";

interface Store {
  count: number;
  text: string;
}

const [Provider, useSelector, useMutation] = createStoreContext<Store>();

const Component1 = () => {
  const count = useSelector((s) => s.count);
  const increment = useMutation((m) => m((prev) => ({ ...prev, count: prev.count + 1 })));
  const reset = useMutation((m) => m((prev) => ({ ...prev, count: 0 })));

  return (
    <div className="flex flex-col space-y-4">
      <div>{count}</div>

      <div className="flex space-x-4">
        <button
          className="bg-emerald-400 rounded-md p-2 px-5 text-white hover:bg-emerald-500"
          onClick={increment}
        >
          +1
        </button>
        <button
          className="border-2 border-red-400 text-red-400 rounded-md p-2 px-3 hover:border-red-500 hover:text-red-500"
          onClick={reset}
        >
          Reset
        </button>
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
