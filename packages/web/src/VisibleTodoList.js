import React from "react"
import { VisibilityContext } from "./VisibilityStore"
import { TodosContext } from "./TodosStore"
import TodoList  from "./TodoList"
import getVisibleTodos from "./getVisibleTodos"

const VisibleTodoList = () => (
  <VisibilityContext.Consumer>
    {({ visibilityFilter }) => (
      <TodosContext.Consumer>
        {({ todos, clearTodo, toggleTodo }) => (
          <TodoList
            todos={getVisibleTodos(todos, visibilityFilter)}
            onClearTodo={id => clearTodo(id)}
            onToggleTodo={id => toggleTodo(id)}
          />
        )}
      </TodosContext.Consumer>
    )}
  </VisibilityContext.Consumer>
)

export default VisibleTodoList