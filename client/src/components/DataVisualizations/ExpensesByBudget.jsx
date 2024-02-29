import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


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

  const [expensesByCategory, setExpensesByCategory] = useState({});

  useEffect(() => {
    if (data) {
      const updatedExpensesByCategory = {};
      data.budget.categories.forEach(category => {
        category.expenses.forEach(expense => {
          const categoryName = expense.categoryName;
          if (!updatedExpensesByCategory[categoryName]) {
            updatedExpensesByCategory[categoryName] = [];
          }
          updatedExpensesByCategory[categoryName].push({
            date: `${expense.month}/${expense.day}`,
            amount: expense.amount,
            description: expense.description,
          });
        });
      });
      setExpensesByCategory(updatedExpensesByCategory);
      // onDataProcessed(updatedExpensesByCategory);
    }
  }, [data]);

  if (loading) return null;
  if (error) return null;

  // Prepare data for the bar chart
  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: 'Expenses By Category',
        data: Object.values(expensesByCategory).map(expenses => expenses.reduce((total, expense) => total + expense.amount, 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-50 border border-1 border-success rounded p-4 mb-4 shadow">
      {expensesByCategory && <Bar data={chartData} />}
    </div>
  );
};

export default ExpensesByBudget;