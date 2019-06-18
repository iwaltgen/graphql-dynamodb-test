
import { ApolloServer, gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    hello: String!
    say(name: String!): String!
  }
`;

const resolvers = {
  Query : {
    hello: () => 'Hello world!',
    say: (obj: any, args: any, context: any, info: any) => {
      console.log("obj: ", obj);
      console.log("args: ", args);
      console.log("context: ", context);
      console.log("info: ", info);
      return `${args.name} said.`;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

exports.graphql = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
