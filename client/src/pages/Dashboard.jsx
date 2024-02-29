import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import BudgetList from '../components/BudgetList'
import { QUERY_USER } from '../utils/queries';
import Signup from './Signup'
import Login from './Login'

function Dashboard() {
    if (!Auth.loggedIn()) {
        return (
            <div className="bg-image justify-content-center opacity-75 p-4 border border-1 border-success rounded p-4 shadow"
            style={{
              backgroundImage: "url(/assets/images/home-bg.jpg)",
              height: "100vh",
              width: "100vw",
              bakgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              webkitBackgroundSize: 'cover',
              mozBackgroundSize: 'cover',
              oBackgroundSize: 'cover',

            }}>
            <div className= "row w-100 justify-content-center mt-4">
                <Login />
                <h2 className="col-2 align-self-center text-center text-light">OR</h2>
                <Signup /> 
            </div>             
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
        <div className="bg-image justify-content-center opacity-75 p-4 border border-1 border-success rounded p-4 shadow"
        style={{
          backgroundImage: "url(/assets/images/dashboard-bg.jpg)",
          height: "100vh",
          width: "100vw",
          bakgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          webkitBackgroundSize: 'cover',
          mozBackgroundSize: 'cover',
          oBackgroundSize: 'cover',

        }}>
        
            <div className="row align-items-center row w-100 justify-content-center mt-4 p-4">
                <h1 className= "col-3 bg-white text-center rounded bolder shadow border border-1 border-success">Hello {user}!</h1>
                <div className= "col-2"></div>
                <div className="col-5 border border-1 border-success rounded p-4 shadow bg-light">
                <h2 className="border border-1 border-success rounded text-center"><i className="bi bi-cash"></i> MY BUDGETS</h2>
                <BudgetList budgets={data.user.budgets}></BudgetList>
                </div>     
            </div>

        </div>
    )


}

export default Dashboard;