// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";

// const Home = () => {
//   return (
//     <div className="container">
//       <CategoryMenu />
//       <ProductList />
//       <Cart />
//     </div>
//   );
// };


import React, { useState } from 'react';
import BudgetTotal from "../components/BudgetTotal";
import BudgetTable from "../components/BudgetTable";
import ExpensesForm from "../components/ExpensesForm";
import TransactionsTable from "../components/TransactionsTable";

const Home = () => {
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


