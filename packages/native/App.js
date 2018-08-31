import React from 'react';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import uuid from 'uuid';
import Todos from './Todo.js';
import {hi, Todo} from "shared";

export default class App extends React.Component { 
  render() {
    return(
    <Todo.TodoStore><Container /></Todo.TodoStore>)
  }
}


 class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ id: uuid.v4(), completed: false, title: hi }],
    };
  }
  submitTodo = () => {
    this.setState(({todos, textInput}) => ({
      todos: [...todos, { id: uuid.v4(), completed: false, title: textInput }],
      textInput: '',
    }))
  }
  toggleCheck = key => {
    this.setState(({todos}) => ({
      todos: todos.map(todo => {
        if (todo.key === key) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    }));
  }
  deleteTask = id => {
    this.setState(({todos}) => ({
      todos: todos.filter(todo => todo.id !== id),
    }));
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <Todo.TodosContext.Consumer>
    {({ error, loadng, todos }) =>
      error ? (
        "An unexpected error occurred"
      ) : loadng ? (
        "Loading..."
      ) : (
        <FlatList
          data={[...this.state.todos, ...todos].map(x => ({...x, key:x.id}))}
          renderItem={({item}) =>
            <Todos
              key={item.id}
              title={item.title}
              completed={item.completed}
              onToggleCheck={() => this.toggleCheck(item.id)}
              onDeleteTask={() => this.deleteTask(item.id)}
            />}
        />
      )}
  </Todo.TodosContext.Consumer>

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