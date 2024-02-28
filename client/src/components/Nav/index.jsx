import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/">
              My Budgets
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );

    }
  }

  return (
    <div className="row shadow rounded border border-3 mb-4">
    <header className="col-6">
      <img src="./src/assets/images/money-master-logo.jpeg" alt="Money Master Logo" className="w-100"></img>
      <nav className="col-6">
        {showNavigation()}
      </nav>
    </header>
    </div>
  );
}

export default Nav;
