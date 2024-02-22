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


import BudgetTotal from "../components/BudgetTotal";
import BudgetTable from "../components/BudgetTable";
import ExpensesForm from "../components/ExpensesForm";
import TransactionsTable from "../components/TransactionsTable";

const Home = () => {
  return (
    <div className="container">      
      <BudgetTotal/>
      <BudgetTable/>
      <ExpensesForm/>
      <TransactionsTable/>
    </div>
  )
}

export default Home;
