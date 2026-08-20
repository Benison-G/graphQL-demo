# GraphQL Demo

A small GraphQL API built with Apollo Server. The project is intended as a learning/demo application for understanding GraphQL schemas, resolvers, nested relationships, queries, and mutations.

## What This Project Demonstrates

- Starting an Apollo GraphQL server with `@apollo/server`.
- Defining a GraphQL schema with SDL in `typeDefs.js`.
- Returning data from resolver functions in `resolvers.js`.
- Querying authors and books.
- Resolving relationships in both directions:
  - An author can return their books.
  - A book can return its author.
- Adding a new book with a mutation.
- Using ES module syntax in Node.js.
- Using `nodemon` so the server restarts when source files change.

## Requirements

- Node.js 18 or newer.
- npm.
- A GraphQL client such as Apollo Sandbox, Insomnia, Postman, or a browser that can access the Apollo landing page.

Check your installed versions:

```bash
node --version
npm --version
```

## Project Files

- `server.js` - Creates the Apollo Server, starts the standalone HTTP server, and listens on port `4000`.
- `typeDefs.js` - Contains the GraphQL schema written in SDL.
- `resolvers.js` - Contains the in-memory data and resolver functions.
- `package.json` - Defines the project metadata, dependencies, and npm scripts.
- `package-lock.json` - Locks the installed dependency versions.

## First-Time Setup

Open a terminal in the project directory:

```bash
cd C:\Users\ADMIN\OneDrive\Documents\graphQL-demo
```

Install the dependencies:

```bash
npm install
```

This installs Apollo Server, GraphQL, and Nodemon from `package.json`.

## Launching the Server

Start the development server with:

```bash
npm start
```

The `start` script runs:

```bash
nodemon ./server.js
```

When the server starts successfully, the terminal prints a URL similar to:

```text
Server ready at http://localhost:4000/
```

Open that URL in a browser. Apollo Server normally displays the Apollo Sandbox, where you can write and execute operations.

The GraphQL endpoint is:

```text
http://localhost:4000/
```

Keep the terminal running while using the API. Stop the server with `Ctrl+C`.

## Basic Queries

### Get all authors

```graphql
query GetAuthors {
  authors {
    id
    name
  }
}
```

### Get all books

```graphql
query GetBooks {
  books {
    id
    title
  }
}
```

### Get authors and their books

The `Author.books` resolver uses each author's `bookIds` array to find matching records in `data.books`.

```graphql
query GetAuthorsWithBooks {
  authors {
    id
    name
    books {
      id
      title
    }
  }
}
```

### Get books and their authors

The `Book.author` resolver uses the book's `authorId` to find the matching author.

```graphql
query GetBooksWithAuthors {
  books {
    id
    title
    author {
      id
      name
    }
  }
}
```

## Adding a Book

The schema defines an `addBook` mutation. Run this operation in Apollo Sandbox:

```graphql
mutation AddBook {
  addBook(
    authorId: "1"
    publishedYear: 2026
    title: "A New GraphQL Book"
  ) {
    id
    title
    author {
      name
    }
  }
}
```

The mutation adds the book to the in-memory `data.books` array. Because there is no database, the new record disappears whenever the server restarts.

After adding a book, query the books again to see it during the current server session.

## Understanding the Data Flow

1. A client sends a GraphQL query to `http://localhost:4000/`.
2. Apollo validates the query against the schema in `typeDefs.js`.
3. Apollo calls the resolver matching each root field in `resolvers.js`.
4. Nested fields call their type resolver when one is defined.
5. The resolver returns JavaScript objects, which Apollo shapes according to the requested fields.

The relationship data is represented like this:

- Authors store related book IDs in `bookIds`.
- Books store their related author ID in `authorId`.
- `Author.books` filters books by `bookIds`.
- `Book.author` finds an author by `authorId`.

## Development Workflow

1. Start the server with `npm start`.
2. Open the Apollo URL in a browser.
3. Change the schema or resolvers.
4. Save the file; Nodemon restarts the server automatically.
5. Run a query that exercises the changed field.
6. Check the terminal for syntax, schema, or resolver errors.

If the server does not start, stop it and run the file directly for a simpler error message:

```bash
node server.js
```

If port `4000` is already in use, stop the other process or change the port in `server.js`.

## Current Limitations and Follow-Up Tasks

These are high-level tasks for continuing the project later:

- Add validation so a mutation cannot create a book for a missing author.
- Keep generated book IDs as strings to match the `ID` fields and existing data.
- Add more queries, such as looking up one author or one book by ID.
- Add mutations for updating and deleting books.
- Move the data from memory into a real database.
- Add automated tests for queries, nested resolvers, and mutations.
- Add error handling for invalid input.
- Add filtering, sorting, and pagination for larger result sets.
- Add authentication and authorization if the API becomes user-facing.

## Important Reminder

This project currently uses in-memory data only. Any changes made through `addBook` are temporary and are lost when Node.js stops or restarts.
