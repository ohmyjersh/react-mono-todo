import React from "react"
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import * as todoFuncs from './todoFuncs';


const defaultState = {
  error: null,
  loading: false,
  todos: [{id:0, title:'shared', completed:false}],
}

export const TodosContext = React.createContext(defaultState)


const GET_TODOS = gql`
    query {
      todos {
        id,
        title,
        completed
      }
    }
`;

const GetTodos = (props) => {
  return (
  <Query query={GET_TODOS}>
    {({ loading, error, data }) => {
      console.log(loading);
      if (error) return props.onError(error);
      if (loading || !data) return props.onFetching;
      return props.onSuccess(data);
    }}
  </Query>) }

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
          error: this.state.error,
          loading: this.state.loading,
          todos: this.state.todos,
          loadTodos: this.loadTodos,
          toggleTodo: this.toggleTodo,
          clearTodo: this.clearTodo,
          addTodo: this.addTodo,
          GetTodos: GetTodos
        }}>
        {this.props.children}
      </TodosContext.Provider>
    )
  } 
}