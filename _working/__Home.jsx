import React, { useState, useEffect } from 'react';
import BudgetTotal from "../components/BudgetTotal";
import BudgetTable from "../components/BudgetTable";
import ExpensesForm from "../components/ExpensesForm";
import TransactionsTable from "../components/TransactionsTable";
import Auth from '../utils/auth'
import Signup from './Signup';
import Login from './Login';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BUDGET } from '../utils/queries';
import { ADD_BUDGET } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { getExpenses } from '../utils/helpers';
import ExpensesByBudget from '../components/DataVisualizations/ExpensesByBudget';
import DataVisualization from '../components/DataVisualizations/VisualizationComponent';
import getExpensesByBudgetAndCategories from '../components/DataVisualizations/Resolver';

const Home = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_BUDGET, { variables: { id }, });

  if (!Auth.loggedIn()) {
    return (
      <div className="row shadow rounded border border-3 p-4">
        <Login />
        <h2 className="col-2 align-self-center">OR</h2>
        <Signup />
      </div>
    );
  }

  const [expensesByCat, setExpensesByCat] = useState({ Housing: '', Food: '', Transportation: '', Misc: '' });
  const [expenses, setExpenses] = useState([]);

  const handleExpenseSubmit = (expense) => {
    setExpenses([...expenses, expense]);
  };

  useEffect(() => {
    if (data) {
      var housingExpenses = 0, foodExpenses = 0, transportationExpenses = 0, miscExpenses = 0;
      const categoriesData = data.budget.categories;
      const expensesData = getExpenses(categoriesData);
      setExpenses([...expenses, ...expensesData]);
      console.log('expenses data:', expensesData);
      expensesData.forEach(expense => {
        if (expense.categoryName === 'Housing') {
          housingExpenses += expense.amount;
        } else if (expense.categoryName === 'Food') {
          foodExpenses += expense.amount;
        } else if (expense.categoryName === 'Transportation') {
          transportationExpenses += expense.amount;
        } else if (expense.categoryName === 'Misc') {
          miscExpenses += expense.amount;
        }
      });
      setExpensesByCat({ Housing: housingExpenses, Food: foodExpenses, Transportation: transportationExpenses, Misc: miscExpenses });
    }
  }, [data]);

  const [groupedExpenses, setGroupedExpenses] = useState(null);

  useEffect(() => {
    if (data) {
      const newGroupedExpenses = getExpensesByBudgetAndCategories();
      setGroupedExpenses(newGroupedExpenses);
    }
  }, [data]);

  return (
    <div className="row shadow rounded border border-3 p-4">
      <BudgetTotal id={id} />
      <BudgetTable id={id} expenses={expenses} expensesByCat={expensesByCat} />
      <ExpensesForm onSubmit={handleExpenseSubmit} />
      <TransactionsTable expenses={expenses} />
      <ExpensesByBudget id={id} />
      <DataVisualization groupedExpenses={groupedExpenses} />
    </div>
  );
}

export default Home;