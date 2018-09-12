import React from "react"
import * as todoFuncs from './todoFuncs';

const defaultState = {
  error: null,
  loading: false,
  todos: [{id:0, title:'shared', completed:false}],
}

export const TodosContext = React.createContext(defaultState)

export default class TodosStore extends React.Component {
  state = defaultState


  toggleTodo = id => {
      this.setState(state => todoFuncs.toggleTodo(state, id));
  }

  clearTodo = id => {
      this.setState(state => todoFuncs.clearTodo(state, id));
 }

  addTodo = title => {
      this.setState(state => todoFuncs.addTodo(state, title));
}

  render() {
    return (
      <TodosContext.Provider
        value={{
          stuff:'hi',
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