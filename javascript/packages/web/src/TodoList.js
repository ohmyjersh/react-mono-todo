import React from "react"
import PropTypes from "prop-types"
import Todo from "./Todo"

const TodoList = props => {
 const {GetTodos} = props;
  return (
    <div>
    <GetTodos 
      onError={() => (<div>error</div>)} 
      onFetching={() => (<div>fetch</div>)} 
      onSuccess={({todos}) => ( 
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <Todo
              id={todo.id}
              text={todo.title}
              completed={todo.completed}
              onToggle={props.onToggleTodo}
              onClear={props.onClearTodo}
            />
          </li>
        ))}
      </ul>)}/>

    </div>
  )
}

TodoList.displayName = "TodoList"

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onClearTodo: PropTypes.func.isRequired,
}

export default TodoList