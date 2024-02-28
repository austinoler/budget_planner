import { Link } from "react-router-dom";

const BudgetList = (props) => {

    console.log('props: ' + props[1]);
    var budgets = Object.values(props)[0];
    console.log(budgets);
    return (
        <>
            {budgets ?
                budgets.map((budget, index) => ( <div><Link to={`/budget/${budget._id}`}>Created on: {budget.month + '/' + budget.year} Budget Total: {budget.total}</Link></div>)) : <div>No Budgets</div>  
            }
        </>

    )
}


export default BudgetList;
