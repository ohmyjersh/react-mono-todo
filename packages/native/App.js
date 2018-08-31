import React from 'react';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import uuid from 'uuid';
import Todo from './Todo.js';
import {hi} from "shared";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ key: uuid.v4(), done: false, text: hi }],
    };
  }
  submitTodo = () => {
    this.setState(({todos, textInput}) => ({
      todos: [...todos, { key: uuid.v4(), done: false, text: textInput }],
      textInput: '',
    }))
  }
  toggleCheck = key => {
    this.setState(({todos}) => ({
      todos: todos.map(todo => {
        if (todo.key === key) {
          todo.done = !todo.done;
        }
        return todo;
      }),
    }));
  }
  deleteTask = key => {
    this.setState(({todos}) => ({
      todos: todos.filter(todo => todo.key !== key),
    }));
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <FlatList
          data={this.state.todos}
          renderItem={({item}) =>
            <Todo
              text={item.text}
              done={item.done}
              onToggleCheck={() => this.toggleCheck(item.key)}
              onDeleteTask={() => this.deleteTask(item.key)}
            />}
        />
        <View style={styles.textBox}>
          <View style={styles.wrapper}>
            <TextInput
              placeholder="What do you want to do?"
              onChangeText={textInput => this.setState({textInput})}
              onSubmitEditing={this.submitTodo}
              value={this.state.textInput}
              style={styles.textInput}
            />
          </View>
          <Icon
            name="add"
            onPress={this.submitTodo}
            iconStyle={styles.icon}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  textBox: {
    flexDirection: 'row',
  },
  textInput: {
    flexGrow: 1,
  },
  icon: {
    padding: 10,
  },
  wrapper: {
    flex: 1
  },
});

// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import SharedInfo from "shared";

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>{SharedInfo}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });


// import styles from './src/styles';
// import ToDoListContainer from './src/ToDoListContainer';
// import React from 'react';
// import {
//   NavigatorIOS
// } from 'react-native';

// class ToDoApp extends React.Component {
//     render() {
//         return (
//             <NavigatorIOS
//                 style={styles.navigator}
//                 initialRoute={{component: ToDoListContainer, title: 'TO DOs'}}/>
//         );
//     }
// }

// export default ToDoApp;
