
import React, { useState, useEffect } from 'react';
import BudgetTotal from "../components/BudgetTotal";
import BudgetTable from "../components/BudgetTable";
import ExpensesForm from "../components/ExpensesForm";
import TransactionsTable from "../components/TransactionsTable";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_BUDGET } from '../utils/queries';
import Auth from '../utils/auth'
import Signup from './Signup';
import { ADD_BUDGET } from '../utils/mutations';



const Home = () => {

  if (!Auth.loggedIn()) {
    return <Signup></Signup>
  }

  const [budget, setBudget] = useState(null);

  useEffect(() => {
    // Check if the current loggedin user has a budget for this month. If not, create one with default amount of 500
    var userId = Auth.getProfile().data._id
    const currentDate = new Date;
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    // check if there is a budget for this month/year

    // const { loading, data } = useQuery(QUERY_BUDGET, {
    //   variables: { userId, month, year }
    // });
    // if (loading) {
    //   return <h1>Loading...</h1>
    // }
    // console.log(data.budget);
  //   // if budget exists then send the total to budgetTotal component else create one with default value of 500
  //   if (data.budget) {
  //     budget = data.budget.total
  //   } else {
  //     // const [addBudget, { error }] = useMutation(ADD_BUDGET
  //     //   // , {
  //     // //   refetchQueries: [
  //     // //     QUERY_BUDGET,
  //     // //     'getBudget'
  //     // //   ]}
  //     // );

  //     // const { data } = addBudget({
  //     //   variables: {
  //     //     userId,
  //     //     month,
  //     //     year,
  //     //     total: 500
  //     //   },
  //     // });
  //     budget = 500;
  //   }
  }, []);

  const [expenses, setExpenses] = useState([]);
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

export default Home;