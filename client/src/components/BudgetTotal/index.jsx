import React, { useState } from 'react';

function BudgetTotal() {
  const [totalBudget, setTotalBudget] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleInputChange = (event) => {
    // Set the total budget
    setTotalBudget(parseFloat(event.target.value).toFixed(2));
  };

  const handleSubmit = () => {
    // Hide the form when the user submits
    setShowForm(false);
  };

  const handleEditClick = () => {
    // Show the form when edit button is clicked
    setShowForm(true);
  };

  return (
    <>
      {/* Conditional rendering to show/hide the form */}
      {showForm ? (
        <div className="form justify-content-center">
          <div className="form-Group text-center">
            <label htmlFor="inputBudget" className="fs-2">This Month's Budget:</label>
            <div className="row justify-content-center">
              <span className="col-1 w-auto fs-4">$</span>
              <span className="col-2 w-25">
                <input
                  type="number"
                  min="0"
                  step="any"
                  onChange={handleInputChange}
                  className="form-control"
                  id="inputBudget"
                  placeholder="Enter Amount"
                />
              </span>
              <span className="col-1 w-auto">
                <button className="btn btn-primary" onClick={handleSubmit}>OK</button>
                <i className="bi bi-pencil-square" onClick={handleEditClick}></i>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Display the message once the budget has been submitted */}
          <p>You have entered a budget of ${totalBudget}</p>
          {/* Show the edit button */}
          <i className="bi bi-pencil-square" onClick={handleEditClick}></i>
        </div>
      )}
    </>
  );
}

export default BudgetTotal;

