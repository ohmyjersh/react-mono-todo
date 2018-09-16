require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_uuid_v4__);
const {
  ApolloServer,
  gql
} = __webpack_require__(2);

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

const upsertItemInArray = (array, item, index) => index < 0 ? [...array, item] : [...array.slice(0, index), item, ...array.slice(index + 1)];

let todos = [{
  id: "0",
  title: 'get money',
  completed: false
}, {
  id: "1",
  title: 'make money',
  completed: false
}];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Todo {
    id: String,
    title: String,
    completed: Boolean
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    todos: [Todo]
  }
  type Mutation {
    addTodo(title:String):  [Todo],
    markAsComplete(id:String, completed:Boolean):  [Todo]
  }
`;

const resolvers = {
  //Subscription: {
  // todoAdded : {
  //   subscribe: withFilter(() => pubsub.asyncIterator(['TODO_ADDED']),
  //         (payload, variables) => {
  //          return payload.todoAdded.id === variables.channelId;
  //         },
  //       ),
  // },
  //},
  Query: {
    todos: () => todos
  },
  Mutation: {
    addTodo: (root, args, context, info) => {
      let todo = {
        id: __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default()(),
        title: args.title,
        completed: false
      };
      todos.push(todo);
      return todos;
    },
    markAsComplete: (root, args, context, info) => {
      let index = todos.findIndex(x => x.id == args.id);
      if (index < 0) {
        throw new Error("No todo found!");
      } else {
        let todo = todos[index];
        let newTodo = Object.assign({}, todo, {
          completed: args.completed
        });
        todos = upsertItemInArray(todos, newTodo, index);
        return todos;
      }
    }
    // addTodo: (root, args, context, info) => {
    //   let index = channels.findIndex(x => x.id === args.channelId);
    //   let newMessage = {id: uuidv4(), message: args.message };
    //   channels[index].messages.push(newMessage);
    //   pubsub.publish('MESSAGE_ADDED', { commentAddedToChannel: channels[index] });
    //   return channels[index];
    // }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: false
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({
  url
}) => {
  console.log(`🚀  Server ready at ${url}`);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map