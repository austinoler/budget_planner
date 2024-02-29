import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="list-inline text-end">
            <Link to="/">
            <h4 className= "fw-bold"><i className="bi bi-cash"></i> My Budgets</h4>
            </Link>
          </li>
          <li className="ms-4 list-inline">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              <h4 className= "fw-bold"><i className="bi bi-box-arrow-left"></i> Logout</h4>
            </a>
          </li>
        </ul>
      );

    }
  }

  return (
    <div className="flex shadow rounded border border-3 mb-2">
    <header className="row">
      <img src="/assets/images/logoImage.jpeg" alt="Money Master Logo" className="col-8"></img>
      <nav className="col-4 d-flex align-items-end">
        {showNavigation()}
      </nav>
    </header>
    </div>
  );
}

export default Nav;
