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

const Home = () => {
  const { id } = useParams();
  const { loading, data: budget, error } = useQuery(QUERY_BUDGET, {
    variables: { id },
  });

  if (loading) {
    return (<h1>Loading . . .</h1>)
  }
  console.log(budget);
  if(error){
    console.error(error);
  }

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

  // const [addBudget, { data: addBudgetData, error }] = useMutation(ADD_BUDGET
  //   // , {
  //   //   refetchQueries: [
  //   //     QUERY_BUDGET,
  //   //     'getBudget'
  //   //   ]}
  // );

  // if budget exists then send the total to budgetTotal component else create one with default value of 500
  // useEffect(() => {
  //   if (!data) {
  //     addBudget({
  //       variables: {
  //         userId,
  //         month,
  //         year,
  //         total: 500
  //       }
  //     });
  //   } else {
  //     budget = data.budget.total
  //   }
  // }, [data]);

  const [expenses, setExpenses] = useState([]);
  const handleExpenseSubmit = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="row shadow rounded border border-3 p-4">
      <BudgetTotal />
      <BudgetTable expenses={expenses} />
      <ExpensesForm onSubmit={handleExpenseSubmit} />
      <TransactionsTable expenses={expenses} />
    </div>
  );
}

export default Home;
