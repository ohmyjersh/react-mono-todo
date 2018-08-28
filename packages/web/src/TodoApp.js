import React from "react"
import {Todo} from "shared"
import VisibleTodoList from "./VisibleTodoList"
import AddTodo from "./AddTodo"
import FilterLink from "./FilterLink"

const TodoApp = () => (
  <Todo.TodosContext.Consumer>
    {({ error, loadng, todos }) =>
      error ? (
        "An unexpected error occurred"
      ) : loadng ? (
        "Loading..."
      ) : (
        <React.Fragment>
          <VisibleTodoList />
          <AddTodo />
          <footer>
            {"Show "}
            <FilterLink filter="SHOW_ALL">All</FilterLink>
            {", "}
            <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
            {", "}
            <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
          </footer>
        </React.Fragment>
      )}
  </Todo.TodosContext.Consumer>
)

export default TodoApp