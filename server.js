import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
    type User {
        id: ID!
        username: String!
        firstName: String!
        lastName: String!
    }

    type Tweet {
        id: ID!
        text: String!
        author: User!
    }

    type Query {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

const server = new ApolloServer({
  typeDefs,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
