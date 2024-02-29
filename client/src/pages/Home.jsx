import React, { useState, useEffect } from 'react';
import BudgetTotal from "../components/BudgetTotal";
import BudgetTable from "../components/BudgetTable";
import ExpensesForm from "../components/ExpensesForm";
import TransactionsTable from "../components/TransactionsTable";
import ExpensesByBudget from '../components/DataVisualizations/ExpensesByBudget';
import Auth from '../utils/auth'
import Signup from './Signup';
import Login from './Login';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BUDGET } from '../utils/queries';
import { ADD_BUDGET, ADD_EXPENSE } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { getExpenses } from '../utils/helpers';

const Home = () => {

  const { id } = useParams();
  //   console.log('id: ', id);
  const [addExpense] = useMutation(ADD_EXPENSE);


  const { loading, data } = useQuery(QUERY_BUDGET, {
    variables: { id },
  });

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
  const day = currentDate.getDay();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  // Gets the expense totals for each category and saves them to state
  useEffect(() => {
    if (data) {
      var housingExpenses = 0, foodExpenses = 0, transportationExpenses = 0, miscExpenses = 0;
      var housingID, foodID, transportationID, miscID;
      const categoriesData = data.budget.categories

      // extract the id for each category and save to state variable
      categoriesData.forEach(category => {
        if(category.name == 'Housing'){
          housingID = category._id
        } else if(category.name == 'Food'){
          foodID = category._id
        } else if(category.name == 'Transportation'){
          transportationID = category._id
        } else if(category.name == 'Misc'){
          miscID = category._id
        }
        setcategoryIDs({housingID, foodID, transportationID, miscID})
      })

      // get expense amount totals for each category and save to state
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

  // state variable used to store the total expenses for each category
  const [expensesByCat, setExpensesByCat] = useState({
    Housing: 0,
    Food: 0,
    Transportation: 0,
    Misc: 0
  });

  // stores the category ID for each category in this budget
  const [categoryIDs, setcategoryIDs] = useState({
    housingID: '',
    foodID: '',
    transportationID: '',
    miscID: ''
  });

  const [expenses, setExpenses] = useState([]);

  const handleExpenseSubmit = async (expense) => {
    // figure out what category the expense belongs to and get the categoryId from state
    var categoryId = '';
    if(expense.categoryName == 'Housing'){
      categoryId = categoryIDs.housingID;
      setExpensesByCat(prevState => ({
        ...prevState,
        ['Housing']: parseFloat(expensesByCat['Housing']) +parseFloat(expense.amount)
      }));
    }else if(expense.categoryName == 'Food'){
      categoryId = categoryIDs.foodID;
      setExpensesByCat(prevState => ({
        ...prevState,
        ['Food']: parseFloat(expensesByCat['Food']) + parseFloat(expense.amount)
      }));

    }else if(expense.categoryName == 'Transportation'){
      categoryId = categoryIDs.transportationID;
      setExpensesByCat(prevState => ({
        ...prevState,
        ['Transportation']: parseFloat(expensesByCat['Transportation']) + parseFloat(expense.amount)
      }));
    }else if (expense.categoryName == 'Misc'){
      categoryId = categoryIDs.miscID;
      setExpensesByCat(prevState => ({
        ...prevState,
        ['Misc']: parseFloat(expensesByCat['Misc']) + parseFloat(expense.amount)
      }));
    }

    // add new expense to database
    const {data} = await addExpense({
      variables: {
        userId,
        categoryName: expense.categoryName, 
        day, month, year, amount: parseFloat(expense.amount),
         description: expense.description,
          categoryId
      }
    });

    setExpenses([...expenses, expense]);
  };

  return (

    <div className="bg-image justify-content-center opacity-75 p-4 border border-1 border-success rounded p-4 shadow h-100 row"
      style={{
        backgroundImage: "url(/assets/images/home-bg.jpg)",
        height: "100vh",
        width: "100vw",
        bakgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',

      }}>

      <div className="row p-4">
        <BudgetTotal id={id} />
        <BudgetTable id={id} expenses={expenses} expensesByCat={expensesByCat} />
        <ExpensesForm onSubmit={handleExpenseSubmit} />
        <TransactionsTable expenses={expenses} />
      </div>
    </div>
  );
}




export default Home;
