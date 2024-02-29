import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_EXPENSES_BY_BUDGET_AND_CATEGORIES = gql`
  query GetExpensesByBudgetAndCategories($budgetId: ID!) {
    budget(_id: $budgetId) {
      categories {
        _id
        budget
        expenses {
          _id
          categoryName
          description
          month
          day
          amount
        }
      }
    }
  }
`;

const ExpensesByBudget = ({ id, onDataReceived, client }) => {
  const [dataObject, setDataObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (client) {
        try {
          const { data } = await client.query({
            query: GET_EXPENSES_BY_BUDGET_AND_CATEGORIES,
            variables: { budgetId: id },
          });
          setDataObject(data);
          onDataReceived(data);
          console.log("response from query is: ");data
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Apollo Client is not defined.");
      }
    };

    fetchData();
  }, [id, onDataReceived, client]);

  return null; // Return null or any other placeholder as the component doesn't render data directly
};

export default ExpensesByBudget;