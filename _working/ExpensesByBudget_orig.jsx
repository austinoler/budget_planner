import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
// import { Bar } from 'react-chartjs-2';

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

const ExpensesByBudget = ({ id }) => {
  const { loading, error, data } = useQuery(GET_EXPENSES_BY_BUDGET_AND_CATEGORIES, {
    variables: { budgetId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error && error.message}</p>;

  console.log('ExpenseByBudget data:', data);

  // Return the data to the parent component
  // return data;

  // loop through the data and display the results

 // Process data to group expenses by category name
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

  // Now expensesByCategory object contains expenses grouped by categoryName with date, amount, and description
  console.log(expensesByCategory);

  return (
    <div className="w-50 border border-1 border-success rounded p-4 mb-4 shadow">
      <h2>Expenses By Budget</h2>
      <p>Here is where the data visualizations will go</p>
      {data && data.budget.categories.map((category) => (
        <div key={category._id}>
          <h3>{category._id}</h3>
          <ul>
            {category.expenses.map((expense) => (
              <li key={expense._id}>
                {expense.categoryName} - {expense.amount}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExpensesByBudget;