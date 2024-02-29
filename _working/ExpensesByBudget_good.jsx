import React, { useEffect } from 'react';
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

const ExpensesByBudget = ({ id, onDataProcessed }) => {
  const { loading, error, data } = useQuery(GET_EXPENSES_BY_BUDGET_AND_CATEGORIES, {
    variables: { budgetId: id },
  });

  useEffect(() => {
    if (data) {
      const expensesByCategory = {};
      data.budget.categories.forEach(category => {
        category.expenses.forEach(expense => {
          const categoryName = expense.categoryName;
          if (!expensesByCategory[categoryName]) {
            expensesByCategory[categoryName] = [];
          }
          expensesByCategory[categoryName].push({
            date: `${expense.month}/${expense.day}`,
            amount: expense.amount,
            description: expense.description,
          });
        });
      });
      onDataProcessed(expensesByCategory);
    }
  }, [data, onDataProcessed]);

  if (loading) return null;
  if (error) return null;

  return null;
};

export default ExpensesByBudget;