import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch.jsx'
import Dashboard from './pages/Dashboard.jsx';
import Budget from './pages/Budget.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: '/budget/:id',
        element: <Budget/>
      },
      {
        path: '/budget',
        element: <Budget />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
