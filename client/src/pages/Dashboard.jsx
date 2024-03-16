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
            <div className="bg-image justify-content-center opacity-75 p-4 border border-1 border-success rounded p-4 shadow"
            style={{
              backgroundImage: "url(/assets/images/login-bg.jpg)",
              height: "100vh",
              width: "100vw",
              bakgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              WebkitBackgroundSize: 'cover',
              MozBackgroundSize: 'cover',
              OBackgroundSize: 'cover',

            }}>
            <div className= "row w-100 justify-content-center mt-4">
                <Login />
                <h2 className="col-2 align-self-center text-center text-light">OR</h2>
                <Signup /> 
            </div>             
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
        <div className="bg-image d-flex justify-content-center align-items-center p-4" style={{ 
            backgroundImage: "url(/assets/images/dashboard-bg.jpg)", 
            height: "100vh", 
            width: "100vw", 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            WebkitBackgroundSize: 'cover', 
            MozBackgroundSize: 'cover', 
            OBackgroundSize: 'cover' 
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h1 className="text-white text-center mb-5 display-3 fw-bold">Hello {user}!</h1>
                        <div className="bg-light rounded p-4 shadow">
                            <h2 className="text-center mb-4"><i className="bi bi-cash"></i> MY BUDGETS</h2>
                            <div className="text-center">
                                <BudgetList budgets={data.user.budgets} />
                                <Link className='btn btn-success rounded mt-3 text-white' style={{ textDecoration: 'none', fontSize: '18px' }} to={`/budget`}>Create New Budget</Link>
                                <br />
                                {/* Add more links as needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )

}

export default Dashboard;