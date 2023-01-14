import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

let tweets = [
  {
    id: "1",
    text: "Hello",
  },
  {
    id: "2",
    text: "Bye",
  },
];

let users = [
  {
    id: "1",
    firstName: "Hong",
    lastName: "Ahn",
  },
  {
    id: "2",
    firstName: "Nol",
    lastName: "Kim",
  },
];

const typeDefs = `
    type User {
        id: ID!
        username: String!
        firstName: String!
        lastName: String!
        fullName: String!
    }

    type Tweet {
        id: ID!
        text: String!
        author: User
    }

    type Query {
        allUsers: [User!]!
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    },
  },
  Mutation: {
    postTweet(root, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);

      return newTweet;
    },
    deleteTweet(root, { id }) {
      const newTweet = tweets.find((tweet) => tweet.id === id);

      if (!newTweet) {
        return false;
      }

      tweets = tweets.filter((tweet) => tweet.id !== id);

      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
