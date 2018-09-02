import v4 from "uuid";

export const toggleTodo = (state, id) => ({
    todos: state.todos.map(todo => {
        if (todo.id === id) {
            return { ...todo,
                completed: !todo.completed
            }
        }
        return todo
    }),
});

export const clearTodo = (state, id) => ({
    todos: state.todos.filter(todo => todo.id !== id),
});

export const addTodo = (state, title) => ({
    todos: state.todos.concat({
        id: v4(),
        title,
        completed: false
    }),
});