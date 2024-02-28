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

const Home = () => {

  const { id } = useParams();
  //   console.log('id: ', id);

  const { loading, data } = useQuery(QUERY_BUDGET, {
    variables: { id },
  });

  // console.log('data: ', data.budget.total);
  // const categoriesData = data.budget.categories

  // const expensesData = getExpenses(categoriesData);
  // console.log('categories', categories);
  // console.log('expenses', expensesData);





  if (!Auth.loggedIn()) {
    return (
      <div className="row shadow rounded border border-3 p-4">
        <Login />
        <h2 className="col-2 align-self-center">OR</h2>
        <Signup />
      </div>
    );
  }

  // Check if the current loggedin user has a budget for this month. If not, create one with default amount of 500
  var userId = Auth.getProfile().data._id
  const currentDate = new Date;
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  // Gets the expense totals for each category and saves them to state
  useEffect(() => {
    if (data) {
      var housingExpenses = 0, foodExpenses = 0, transportationExpenses = 0, miscExpenses = 0;
      const categoriesData = data.budget.categories
      const expensesData = getExpenses(categoriesData)
      setExpenses([...expenses, ...expensesData]);
      console.log('expenses data:', expensesData);
      expensesData.forEach(expense => {
        if(expense.categoryName == 'Housing'){
          housingExpenses += expense.amount;
        }else if(expense.categoryName == 'Food'){
          foodExpenses += expense.amount;
        }else if(expense.categoryName == 'Transportation'){
          transportationExpenses += expense.amount;
        }else if (expense.categoryName == 'Misc'){
          miscExpenses += expense.amount;
        }
      })
      setExpensesByCat({Housing:housingExpenses, Food: foodExpenses, Transportation: transportationExpenses, Misc: miscExpenses })
    }
  }, [data]
  );

  const [expensesByCat, setExpensesByCat] = useState({
    Housing: '',
    Food: '',
    Transportation: '',
    Misc: ''
  });

  const [expenses, setExpenses] = useState([]);
  const handleExpenseSubmit = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="row shadow rounded border border-3 p-4">
      <BudgetTotal id={id} />
      <BudgetTable id={id} expenses={expenses} expensesByCat = {expensesByCat}/>
      <ExpensesForm onSubmit={handleExpenseSubmit} />
      <TransactionsTable expenses={expenses} />
    </div>
  );
}

export default Home;
