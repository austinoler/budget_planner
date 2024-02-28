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
    userId: ID!
    month: Int!
    year: Int!
    total: Float!
    categories: [Category]
  }

  type Category {
    _id: ID
    userId: ID!
    name: String!
    budget: Float!
    expenses: [Expense]
  }

  type Expense {
    _id: ID
    userId: ID!
    categoryName: String!
    day: Int!
    month: Int!
    year: Int!
    amount: Float!
    description: String!
    recurring: Boolean!
  }
 
  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    budgets: [Budget]
    budget(_id: ID!): Budget
    categories: [Category]
    category(_id: ID!): Category
    expenses: [Expense]
    expense(_id: ID!): Expense
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addBudget(userId: ID!, month: Int!, year: Int!, total: Float!): Budget
    updateBudget(_id: ID!, total: Float!): Budget
    addCategory(userId: ID!, name: String!, budget: Float!, budgetId: ID!): Category
    updateCategory(_id:ID!, budget: Float!): Category
    addExpense(userId: ID!, categoryName: String!, day: Int!, month: Int!, year: Int!, amount: Float!, description: String!, recurring: Boolean!, categoryId: ID!): Expense
    updateExpense(_id: ID!, amount: Float, description: String, recurring: Boolean): Expense
    deleteExpense(_id:ID!): Expense
  }
`;

module.exports = typeDefs;

