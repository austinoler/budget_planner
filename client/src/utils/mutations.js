import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_BUDGET = gql`
mutation Mutation($userId: ID!, $month: Int!, $year: Int!, $total: Float!) {
  addBudget(userId: $userId, month: $month, year: $year, total: $total) {
    _id
    userId
    month
    year
    total
  }
}
`;

export const UPDATE_BUDGET = gql`
mutation Mutation($id: ID!, $total: Float!) {
  updateBudget(_id: $id, total: $total) {
    _id
    userId
    month
    year
    total
  }
}
`;

export const ADD_CATEGORY = gql`
mutation Mutation($userId: ID!, $name: String!, $budget: Float!, $budgetId: ID!) {
  addCategory(userId: $userId, name: $name, budget: $budget, budgetId: $budgetId) {
    _id
    userId
    name
    budget
  }
}`;

export const UPDATE_CATEGORY = gql`
mutation Mutation($id: ID!, $budget: Float!) {
  updateCategory(_id: $id, budget: $budget) {
    _id
    userId
    name
    budget
  }
}`;

export const ADD_EXPENSE = gql`
mutation Mutation($userId: ID!, $categoryName: String!, $day: Int!, $month: Int!, $year: Int!, $amount: Float!, $description: String!, $recurring: Boolean, $categoryId: ID!) {
  addExpense(userId: $userId, categoryName: $categoryName, day: $day, month: $month, year: $year, amount: $amount, description: $description, recurring: $recurring, categoryId: $categoryId) {
    _id
    userId
    categoryName
    day
    month
    year
    amount
    description
    recurring
  }
}`;

export const UPDATE_EXPENSE = gql`
mutation Mutation($id: ID!, $amount: Float, $description: String, $recurring: Boolean) {
  updateExpense(_id: $id, amount: $amount, description: $description, recurring: $recurring) {
    _id
    userId
    categoryName
    day
    month
    year
    amount
    description
    recurring
  }
}`;

export const DELETE_EXPENSE = gql`
mutation Mutation($id: ID!, $categoryId: ID!) {
  deleteExpense(_id: $id, categoryId: $categoryId) {
    _id
    userId
    categoryName
    day
    month
    year
    amount
    description
    recurring
  }
}`;


