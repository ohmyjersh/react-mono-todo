import React from 'react';
import { StyleSheet, TextInput, View, FlatList, KeyboardAvoidingView, Button } from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import Todos from './Todo.js';
import { Todo, Visbility, getVisibleTodos } from "shared"

export default class App extends React.Component {
  render() {
    return (
    <Visbility.VisibilityStore>
      <Todo.TodoStore>
        <Container />
      </Todo.TodoStore>
    </Visbility.VisibilityStore>)
  }
}

const Container = () => {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
      <TodoFilters />
      <TodoList />
      <AddTodo />
      </KeyboardAvoidingView>
    );
  };

const TodoFilters = () => (
  <Visbility.VisibilityContext.Consumer>
  {({ visibilityFilter, setVisibilityFilter }) => (
    <View style={styles.filters}>
        <Button disabled={(visibilityFilter === "SHOW_ALL")} onPress={() => setVisibilityFilter("SHOW_ALL")} title="All" />
        <Button disabled={(visibilityFilter === "SHOW_ACTIVE")} onPress={() =>  {
            setVisibilityFilter("SHOW_ACTIVE")}}  title="Active"/>
        <Button disabled={(visibilityFilter === "SHOW_COMPLETED")} onPress={() => setVisibilityFilter("SHOW_COMPLETED")}  title="Completed" />
      </View>
      )}
      </Visbility.VisibilityContext.Consumer>
)

const TodoList = () => (
  <Visbility.VisibilityContext.Consumer>
        {({ visibilityFilter }) => (
    <Todo.TodosContext.Consumer>
    {({ error, loadng, todos, toggleTodo, clearTodo }) =>
      error ? (
        "An unexpected error occurred"
      ) : loadng ? (
        "Loading..."
      ) : (
            <FlatList
              data={getVisibleTodos(todos.map(x => ({ ...x, key: x.id })), visibilityFilter)}
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
    )}
</Visbility.VisibilityContext.Consumer>
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
  filters: {
    justifyContent: 'space-around',
    flexDirection: 'row'
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