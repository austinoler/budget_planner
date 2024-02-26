
import React, { useState } from 'react';
import BudgetTotal from "../components/BudgetTotal";
import BudgetTable from "../components/BudgetTable";
import ExpensesForm from "../components/ExpensesForm";
import TransactionsTable from "../components/TransactionsTable";
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_BUDGET } from '../utils/queries';
import Auth from '../utils/auth'
import Signup from './Signup';
const userId = Auth.getProfile().data._id

function checkCurrentBudget () {
  const currentDate = new Date;
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
   
  const { loading, data } =  useQuery(QUERY_BUDGET, {
    variables: { userId, month, year }
  });
  if(loading){
    return <h1>Loading...</h1>
  }
  if(data.budget){
    return data.budget.total
  }else{
    return 500;
  }
}

const Home = () => {

  if(!Auth.loggedIn()){
    return <Signup></Signup>
  }else{
    const [expenses, setExpenses] = useState([]);
    var budget = checkCurrentBudget();
    console.log('budget: ' + budget);
    const handleExpenseSubmit = (expense) => {
      setExpenses([...expenses, expense]);
    };
    
    return (
      <div className="container row">
      <BudgetTotal />
      <BudgetTable expenses={expenses} />
      <ExpensesForm onSubmit={handleExpenseSubmit} />
      <TransactionsTable expenses={expenses} />
    </div>
  );
}
}

export default Home;