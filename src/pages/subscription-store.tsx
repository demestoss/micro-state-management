import { createStoreContext } from "../lib/subscribed";

interface Store {
    count: number;
    text: string;
}

const [Provider, useSelector, useMutation] = createStoreContext<Store>()

const Component1 = () => {
    const count = useSelector(s => s.count);
    const increment = useMutation(m => m((prev) => ({ ...prev, count: prev.count + 1 })));

    return (
        <div>
            {count} <button className="bg-emerald-400 rounded-md p-2 px-5 text-white hover:bg-emerald-500" onClick={increment}>+1</button>
        </div>
    );
};

const Component2 = () => {
    const visible = useSelector(s => s.count === 5);

    return (
        <div className="flex flex-col">
            <span>I'm invisible??</span>
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