import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import BudgetList from '../components/BudgetList'
import { QUERY_USER } from '../utils/queries';
import Signup from './Signup'
import Login from './Login'
import { Link } from "react-router-dom";

function Dashboard() {
    if (!Auth.loggedIn()) {
        return (
            <div className="row shadow rounded border border-3 p-4">
                <Login />
                <h2 className="col-2 align-self-center">OR</h2>
                <Signup />
            </div>
        )
    }

    // get user data from token
    const user = Auth.getProfile().data.firstName;
    const id = Auth.getProfile().data._id;

    // query user data
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { id }
    });

    if (loading) {
        return (<h1>Loading. . .</h1>)
    }
    
    return (
        <div className="d-flex flex-column align-items-center">
            <div>Hello {user}</div>
            <div>My Budgets</div>
            <BudgetList budgets={data.user.budgets}></BudgetList>
            <Link className = 'btn btn-success rounded'to={`/budget`}>Create new budget</Link>
        </div>
    )


}

export default Dashboard;