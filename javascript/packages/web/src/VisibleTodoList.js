import React from "react"
import { Todo,Visbility } from "shared"
import TodoList  from "./TodoList"
import getVisibleTodos from "./getVisibleTodos"

const VisibleTodoList = () => (
  <Visbility.VisibilityContext.Consumer>
    {({ visibilityFilter }) => (
      <Todo.TodosContext.Consumer>
        {({ todos, clearTodo, toggleTodo }) => (
          <TodoList
            todos={getVisibleTodos(todos, visibilityFilter)}
            onClearTodo={id => clearTodo(id)}
            onToggleTodo={id => toggleTodo(id)}
          />
        )}
      </Todo.TodosContext.Consumer>
    )}
  </Visbility.VisibilityContext.Consumer>
)

export default VisibleTodoList