import { Link } from "react-router-dom";

const BudgetList = (props) => {
    // display the users budgets and create a link to display them
    var budgets = Object.values(props)[0];
    return (
        <div className= "text-center p-2">
            {budgets ?
                budgets.map((budget, index) => ( <div key={index}><Link to={`/home/${budget._id}`}>Created on: {budget.month + '/' + budget.year} Budget Total: ${budget.total}</Link></div>)) : <div>No Budgets</div> 
            }   
        </div>
    )
}


export default BudgetList;
