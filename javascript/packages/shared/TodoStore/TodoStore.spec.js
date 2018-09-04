import * as todoFuncs from './todoFuncs';

let state = {
    todos: [
        {
            id: 1,
            title:'hi',
            completed: false
        }
    ]
}

test('should add new todo to todos', () => {
    const tile = "chicken dinner";
    todoFuncs.addTodo(state, tile);
});

test('remove todo from todos', () => {
    todoFuncs.clearTodo(state, state.todos[0]);
});

test('should toggle todo to be completed', () => {
    todoFuncs.toggleTodo(state, state.todos[0]);
});
