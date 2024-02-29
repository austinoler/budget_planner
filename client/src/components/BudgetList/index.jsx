import { Link } from "react-router-dom";

const BudgetList = (props) => {

    var budgets = Object.values(props)[0];
    console.log(budgets);
    return (
        <div className= "text-center border border-dark rounded p-2">
            {budgets ?
                budgets.map((budget, index) => ( <div key={index}><Link to={`/home/${budget._id}`}>Created on: {budget.month + '/' + budget.year} Budget Total: ${budget.total}</Link></div>)) : <div>No Budgets</div>  
            }
        </div>

    )
}


export default BudgetList;
