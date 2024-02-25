const typeDefs = `
  
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    budgets : [Budget]
  }

  type Budget {
    _id: ID
    month: Int!
    year: Int!
    total: Float!
    categories: [Category]
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
    user(id: ID!): User
    budgets: [Budget]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addBudget(month: Int!, year: Int!, total: Float!): Budget
    removeBudget(budgetId: ID): Budget
  }
`;

module.exports = typeDefs;
