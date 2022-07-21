const HomePage = () => {
  return (
    <div className="flex flex-col space-y-10 mx-auto">
      <h1 className="text-center text-3xl">Hello!</h1>

      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold">What is this project about?</h2>
        <p className="px-3">
          This is an application with examples of using 4 different <b>state management</b>{" "}
          libraries to solve similar problem. Three of them are well known <b>Zustand</b>,{" "}
          <b>Jotai</b> and <b>Valtio</b>. And the last one is <b>Subscribed</b>, which is was
          implemented by me and could solve the same problem
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold">Each application functions:</h2>
        <ol className="list-decimal px-8">
          <li>
            Render List of <b>Todo Lists</b> with functionality to add, remove and mark todo as
            done;
          </li>
          <li>
            Persist each list to <b>localStorage</b> separately;
          </li>
          <li>
            Global text input, that should render text inside each todo list with reset button;
          </li>
          <li>
            Use the same <b>TodoListCore</b> components to render application.
          </li>
        </ol>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold">Micro state management book</h2>
        <p>
          Special thanks to this{" "}
          <a
            className="text-blue-600 visited:text-purple-600"
            href="https://www.packtpub.com/product/micro-state-management-with-react-hooks/9781801812375"
          >
            book
          </a>
          , that shows me different micro state management approaches
        </p>
      </div>
    </div>
  );
};

export default HomePage;
