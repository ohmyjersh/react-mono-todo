import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SharedInfo from "shared";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{SharedInfo}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


// import styles from './application/styles/styles';
// import ToDoListContainer from './application/components/ToDoListContainer';
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
