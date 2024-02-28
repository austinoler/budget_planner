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
query Query($id: ID!) {
  budget(_id: $id) {
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
query Query($id: ID!) {
  category(_id: $id) {
    _id
    userId
    name
    budget
    expenses {
      _id
    }
  }
}`;

export const QUERY_CATEGORIES = gql`
query Query {
  categories {
    _id
    userId
    name
    budget
    expenses {
      _id
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