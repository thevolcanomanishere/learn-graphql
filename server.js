const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");
const app = express();

const books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    id: 2,
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "A book",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of books",
      resolve: () => books,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);
app.listen(5001, () => console.log("Server started on port 5001"));
