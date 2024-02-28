import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import BudgetList from '../components/BudgetList'
import { QUERY_USER } from '../utils/queries';
import Signup from './Signup'
import Login from './Login'

function Dashboard() {
    if (!Auth.loggedIn()) {
        return (
            <div className="row shadow rounded border border-3 p-4 justify-content-center">
                <Login />
                <h2 className="col-2 align-self-center text-center">OR</h2>
                <Signup />
            </div>
        )
    }
    const user = Auth.getProfile().data.firstName;
    const id = Auth.getProfile().data._id;
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { id }
    });

    if (loading) {
        return (<h1>Loading. . .</h1>)
    }
    if (data) {
        console.log(data.user.budgets);
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div>Hello {user}</div>
            <div>My Budgets</div>
            <BudgetList budgets={data.user.budgets}></BudgetList>
        </div>
    )


}

export default Dashboard;