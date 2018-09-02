import React from 'react';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import Todos from './Todo.js';
import { Todo } from "shared";

export default class App extends React.Component {
  render() {
    return (
      <Todo.TodoStore>
        <Container />
      </Todo.TodoStore>)
  }
}

const Container = () => {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
      <TodoList />
      <AddTodo />
      </KeyboardAvoidingView>
    );
  };

const TodoList = () => (
  <Todo.TodosContext.Consumer>
  {({ error, loadng, todos, toggleTodo, clearTodo }) =>
    error ? (
      "An unexpected error occurred"
    ) : loadng ? (
      "Loading..."
    ) : (
          <FlatList
            data={todos.map(x => ({ ...x, key: x.id }))}
            renderItem={({ item }) =>
              <Todos
                key={item.id}
                title={item.title}
                completed={item.completed}
                onToggleCheck={() => toggleTodo(item.id)}
                onDeleteTask={() => clearTodo(item.id)}
              />}
          />
        )}
</Todo.TodosContext.Consumer>
);

class AddTodo extends React.Component {
  state = {
    textInput: ""
  }
  submitTodo = addTodo => {
    addTodo(this.state.textInput);
    this.setState(() => ({
      textInput: "",
    }))
  }
  render() {
    return (
      <Todo.TodosContext.Consumer>
        {({ error, loadng, addTodo }) =>
          error ? (
            "An unexpected error occurred"
          ) : loadng ? (
            "Loading..."
          ) : (
                <View style={styles.textBox}>
                  <View style={styles.wrapper}>
                    <TextInput
                      placeholder="What do you want to do?"
                      onChangeText={textInput => this.setState({ textInput })}
                      onSubmitEditing={() => this.submitTodo(addTodo)}
                      value={this.state.textInput}
                      style={styles.textInput}
                    />
                  </View>
                  <Icon
                    name="add"
                    onPress={() => this.submitTodo(addTodo)}
                    iconStyle={styles.icon}
                  />
                </View>)}
      </Todo.TodosContext.Consumer>
    )
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