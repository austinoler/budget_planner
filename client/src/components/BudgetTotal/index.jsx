import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BUDGET, UPDATE_BUDGET } from '../../utils/mutations';
import Auth from '../../utils/auth'
function BudgetTotal(props) {
  const [totalBudget, setTotalBudget] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [updateBudget, { error }] = useMutation (UPDATE_BUDGET);

  const handleInputChange = (event) => {
    // Set the total budget
    setTotalBudget(parseFloat(event.target.value).toFixed(2));
    
  };
  console.log('prop: ' + props.budget + ' budget: ' + totalBudget);
  const handleSubmit = async (event) => {
    // Hide the form when the user submits
    const date = new Date();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const userId = Auth.getProfile().data._id

    try{
      const { data } = await updateBudget({
        variables: {
          userId,
          month,
          year,
          total: parseFloat(totalBudget)
        }
      })
    }catch (err){
      console.error(err);

    }
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
        <div className="form justify-content-center border border-success rounded p-4 mb-4 shadow">
          <div className="form-Group text-center">
            <h2><label htmlFor="inputBudget">This Month's Budget:</label></h2>
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
                  placeholder={props.budget ? props.budget : 'Enter Budget'}
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

