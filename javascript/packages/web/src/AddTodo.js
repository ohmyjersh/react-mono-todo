import React from "react"
import Input  from "./Input"
import { Todo } from "shared"

const AddTodo = () => (
  <Todo.TodosContext.Consumer>
    {({ addTodo }) => <Input onSubmit={title => addTodo(title)} />}
  </Todo.TodosContext.Consumer>
)

export default AddTodo