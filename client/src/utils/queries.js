import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($id: ID!) {
  user(_id: $id) {
    _id
    firstName
    lastName
    email
    budgets {
      _id
      userId
      month
      year
      total
      categories {
        _id
      }
    }
  }
}
`;
export const QUERY_USERS = gql`
query User {
  users {
    _id
    firstName
    lastName
    email
    budgets {
      _id
      userId
      month
      year
      total
    }
  }
}`;

export const QUERY_BUDGET = gql`
query Budget($id: ID!) {
  budget(_id: $id) {
    _id
    userId
    month
    year
    total
    categories {
      _id
      userId
      name
      budget
    }
  }
}`;

export const QUERY_BUDGETS = gql`
query Budgets {
  budgets {
    _id
    userId
    month
    year
    total
    categories {
      _id
      userId
      name
      budget
    }
  }
}`;

export const QUERY_CATEGORY = gql`
query Category($id: ID!) {
  category(_id: $id) {
    _id
    userId
    name
    budget
    expenses {
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
  }
}`;

export const QUERY_CATEGORIES = gql`
query Categories {
  categories {
    _id
    userId
    name
    budget
    expenses {
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
  }
}`;

export const QUERY_EXPENSE = gql`
query Query($id: ID!) {
  expense(_id: $id) {
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

export const QUERY_EXPENSES = gql`
query Query {
  expenses {
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