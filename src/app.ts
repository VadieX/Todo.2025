import { TodoBoostrapTheme, TodoBulmaTheme, TodoFoudationTheme, TodoMaterializeTheme, TodoTailwindTheme, TodoComponent } from "./components/todo";

const appEl = document.getElementById('app');

const todoWrapper = document.createElement('div');
todoWrapper.setAttribute('id', 'my-list');

appEl?.appendChild(todoWrapper);

const todo = new TodoComponent({
    //theme: TodoBoostrapTheme,
    //theme: TodoBulmaTheme,
    //theme: TodoFoudationTheme,
    //theme: TodoMaterializeTheme,
    theme: TodoTailwindTheme,
});

todo.mount(todoWrapper)
