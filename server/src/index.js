const {
  ApolloServer,
  gql
} = require('apollo-server');
import uuidv4 from 'uuid/v4';
// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

const upsertItemInArray = (array, item, index) =>
  index < 0
    ? [...array, item]
    : [...array.slice(0, index), item, ...array.slice(index + 1)];

let todos = [{
    id: "0",
    title: 'get money',
    completed: false
  },
  {
    id: "1",
    title: 'make money',
    completed: false
  }
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql `
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
    todos: () => todos,
  },
  Mutation: {
    addTodo: (root, args, context, info) => {
      let todo = {
        id: uuidv4(),
        title: args.title,
        completed: false
      }
      todos.push(todo);
      return todos;
    },
    markAsComplete: (root, args, context, info) => {
      let index = todos.findIndex(x => x.id == args.id);
      if(index < 0) {
        throw new Error("No todo found!");
      }
      else {     
        let todo = todos[index]; 
        let newTodo = { ...todo,
          completed: args.completed
        };
        todos = upsertItemInArray(todos, newTodo, index);
        return todos;
      }
    },
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
  debug:false
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({
  url
}) => {
  console.log(`🚀  Server ready at ${url}`);
});