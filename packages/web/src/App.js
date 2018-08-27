import './App.css';

import SharedSecret from "shared";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           {SharedSecret}
//         </p>
//       </div>
//     );
//   }
// }

import React from "react"
import VisibilityStore from "./VisibilityStore"
import TodosStore from "./TodosStore"
import TodoApp from "./TodoApp"

const App = props => {
  return (
    <VisibilityStore>
      <TodosStore>
        <TodoApp />
      </TodosStore>
    </VisibilityStore>
  )
}

export default App;
