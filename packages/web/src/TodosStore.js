import React from "react"
import v4 from "uuid";
// import {
//   ADD_TODO_MUTATION,
//   TOGGLE_TODO_MUTATION,
//   CLEAR_TODO_MUTATION,
// } from "../shared/mutations"

const defaultState = {
  error: null,
  loading: false,
  todos: [],
}

export const TodosContext = React.createContext(defaultState)

export default class TodosStore extends React.Component {
  state = defaultState


  toggleTodo = id => {
      this.setState(state => ({
        todos: state.todos.map(todo => {
          if (todo.id === id) {
            return { ...todo, completed:!todo.completed}
          }
          return todo
        }),
      }));
  }

  clearTodo = id => {
      this.setState(state => ({
        todos: state.todos.filter(todo => todo.id !== id),
      }));
 }

  addTodo = title => {
      this.setState(state => ({
        todos: state.todos.concat({id:v4(), title, completed:false}),
      }));
}

  render() {
    return (
      <TodosContext.Provider
        value={{
          error: this.state.error,
          loading: this.state.loading,
          todos: this.state.todos,
          loadTodos: this.loadTodos,
          toggleTodo: this.toggleTodo,
          clearTodo: this.clearTodo,
          addTodo: this.addTodo,
        }}>
        {this.props.children}
      </TodosContext.Provider>
    )
  } 
}