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
    const title = "chicken dinner";
    const newState = todoFuncs.addTodo(state, title);
    expect(newState.todos.filter(x => x.title === title).length).toBe(1);
});

test('remove todo from todos', () => {
    const newState = todoFuncs.clearTodo(state, state.todos[0].id);
    expect(newState.todos).toEqual([]);
});

test('should toggle todo to be completed', () => {
    const todo = state.todos[0];
    const id = todo.id;
    const completed = !todo.completed;
    const newState = todoFuncs.toggleTodo(state, id);
    expect(newState.todos.find(x => x.id === id).completed).toBe(completed);
});
