import './App.css';

import React from "react"
import {Todo,Visbility} from "shared"
import TodoApp from "./TodoApp"

const App = props => {
  return (
    <Visbility.VisibilityStore>
      <Todo.TodoStore>
        <TodoApp />
      </Todo.TodoStore>
    </Visbility.VisibilityStore>
  )
}

export default App;
