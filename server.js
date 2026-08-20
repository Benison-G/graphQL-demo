import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';
import { ApolloServer } from '@apollo/server';

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// Creates an express app
// Installs Apollo Server instance as the middleware
// Prepares your app to handle the incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(` Server ready at ${url}`)
