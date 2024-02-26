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

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
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
mutation addBudget($userId: ID!, $month: Int!, $year: Int!, $total: Float!) {
  addBudget(userId: $userId, month: $month, year: $year, total: $total) {
    userId
    month
    year
    total
  }
}
`;

export const UPDATE_BUDGET = gql`
mutation Mutation($userId: ID!, $month: Int!, $year: Int!, $total: Float!) {
  updateBudget(userId: $userId, month: $month, year: $year, total: $total) {
    userId
    month
    year
    total
    _id
  }
}
`;

export const ADD_CATEGORY = gql`
mutation Mutation($userId: ID!, $month: Int!, $year: Int!, $name: String!, $budget: Float!) {
  addCategory(userId: $userId, month: $month, year: $year, name: $name, budget: $budget) {
    _id
    userId
    month
    year
    name
    budget
  }
}`;

export const UPDATE_CATEGORY = gql`
mutation Mutation($userId: ID!, $month: Int!, $year: Int!, $name: String!, $budget: Float!) {
  updateCategory(userId: $userId, month: $month, year: $year, name: $name, budget: $budget) {
    _id
    userId
    month
    year
    name
    budget
  }
}`;

export const ADD_EXPENSE = gql`
mutation Mutation($userId: ID!, $categoryName: String!, $day: Int!, $month: Int!, $year: Int!, $amount: Float!, $description: String!, $recurring: Boolean!) {
  addExpense(userId: $userId, categoryName: $categoryName, day: $day, month: $month, year: $year, amount: $amount, description: $description, recurring: $recurring) {
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
mutation Mutation($id: ID!) {
  deleteExpense(_id: $id) {
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


