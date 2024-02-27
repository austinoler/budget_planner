import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query Query($id: ID!) {
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
     
    }
  }
}
`;
export const QUERY_USERS = gql`
query Query {
  users {
    _id
    firstName
    lastName
    email
    budgets {
      _id
    }
  }
}`;

export const QUERY_BUDGET = gql`
query Query($userId: ID!, $month: Int!, $year: Int!) {
  budget(userId: $userId, month: $month, year: $year) {
    _id
    total
    month
    year
  }
}`;

export const QUERY_BUDGETS = gql`
query Query {
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
}`;

export const QUERY_CATEGORY = gql`
query Query($userId: ID!, $month: Int!, $year: Int!, $name: String!) {
  category(userId: $userId, month: $month, year: $year, name: $name) {
    _id
    userId
    month
    year
    name
    budget
    expenses {
      _id
    }
  }
}`;

export const QUERY_CATEGORIES = gql`
query Categories {
  categories {
    _id
    userId
    month
    year
    name
    budget
    expenses {
      _id
    }
  }
}`;

export const QUERY_EXPENSE = gql`
query Expense($userId: ID!, $categoryName: String!, $day: Int!, $month: Int!, $year: Int!, $amount: Float!, $recurring: Boolean!) {
  expense(userId: $userId, categoryName: $categoryName, day: $day, month: $month, year: $year, amount: $amount, recurring: $recurring) {
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
query Expense {
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