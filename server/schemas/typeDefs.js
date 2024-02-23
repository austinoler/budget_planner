const typeDefs = `
  
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    budget : [Budget]
  }

  type Budget {
    _id: ID
    month: String!
    total: Float!
    category: String
  }

  type Expense {
    _id: ID
    date: String!
    amount: Float!
    description: String
  }
  type Category {
    _id: ID
    name: String!
    amount: Float!
    expenses: [Expense]
  }


  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    users: [User]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
