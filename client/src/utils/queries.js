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
export const QUERY_BUDGET = gql`
query Query($userId: ID!, $month: Int!, $year: Int!) {
  budget(userId: $userId, month: $month, year: $year) {
    _id
    total
    month
    year
  }
}`;
