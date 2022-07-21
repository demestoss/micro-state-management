# Micro State Management applications example

## What is this repository about?

This is an application with examples of using 4 different <b>state management</b>
libraries to solve similar problem. Three of them are well known <b>Zustand</b>,
<b>Jotai</b> and <b>Valtio</b>. And the last one is <b>Subscribed</b>, which is was
implemented by me and could solve the same problem

## Each application functions:

- Render List of <b>Todo Lists</b> with functionality to add, remove and mark todo as done;
- Persist each list to <b>localStorage</b> separately;
- Global text input, that should render text inside each todo list with reset button;
- Use the same <b>TodoListCore</b> components to render application.

## Micro state management book

Special thanks to this [book](https://www.packtpub.com/product/micro-state-management-with-react-hooks/9781801812375), that shows me different micro state management approaches

## Deployment

Application deployed on [Vercel](https://state-manager.vercel.app)