const data = {
    authors: [
        {
            id:"1",
            name:"J.K. Rowling",
            age:55,
            bookIds: ["1", "2"]
         },
        {
            id:"2",
            name:"George R.R. Martin",
            age:72,
            bookIds: ["3"]
        },
        {
            id:"3",
            name:"J.R.R. Tolkien",
            age:81,
            bookIds: ["4"]
        }
    ],
    books: [
        {
            id:"1",
            title:"Harry Potter and the Sorcerer's Stone",
            publishedYear:1997,
            authorId:"1"
        },
        {
            id:"2",
            title:"Harry Potter Part II",
            publishedYear:1999,
            authorId:"1"
        },
        {
            id:"3",
            title:"Harry Potter and the Chamber of Secrets",
            publishedYear:1998,
            authorId:"2"
        },
        {
            id:"4",
            title:"Harry Potter and the Prisoner of Azkaban",
            publishedYear:1999,
            authorId:"3"
        }
    ]
}


export const resolvers = {
    Author: {
        books: (parent) => {
            return data.books.filter(book => parent.bookIds.includes(book.id))
        }
    },
    Book: {
        author: (parent, args, context, info) => {
            return data.authors.find(author => author.id === parent.authorId)
        }
    },
    Query: {
        authors: () => {
            return data.authors
        },
        books: () => {
            return data.books
        }
    }
}