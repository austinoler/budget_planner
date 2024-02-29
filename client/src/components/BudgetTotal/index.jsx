import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BUDGET, UPDATE_BUDGET } from '../../utils/mutations';
import { QUERY_BUDGET } from '../../utils/queries';

import Auth from '../../utils/auth'
function BudgetTotal(props) {
  const [totalBudget, setTotalBudget] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [updateBudget, { error }] = useMutation(UPDATE_BUDGET);

  const handleInputChange = (event) => {
    // Set the total budget
    setTotalBudget(parseFloat(event.target.value).toFixed(2));

  };
  // Get budget data from selected budget
  const { loading, data } = useQuery(QUERY_BUDGET, {
    variables: { id: props.id },
  });

  // Set budget total and hide form
  useEffect(() => {
    if (!loading) {
      setTotalBudget(data.budget.total)
      setShowForm(false)
    }
  }, [data])

  console.log('prop: ' + props.id + ' budget: ', totalBudget);

  const handleSubmit = async (event) => {
    // Hide the form when the user submits
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const userId = Auth.getProfile().data._id

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
        <div className="col-12 form justify-content-center border border-success rounded p-4 mb-4 shadow">
          <div className="form-Group text-center">
            <h2><label htmlFor="inputBudget">Budget Total:</label></h2>
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
                  placeholder={totalBudget ? totalBudget : 'Enter Budget'}
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
        <div className= "d-flex align-items-center flex-column justify-content-center border border-success rounded p-4 mb-4 shadow">
          {/* Display the message once the budget has been submitted */}
          <h2 className = "text-center">Budget Total:  <div>${totalBudget}</div></h2>
          {/* Show the edit button */}
          <i className=" bi bi-pencil-square" onClick={handleEditClick}></i>
        </div>
      )}
    </>
  );
}

export default BudgetTotal;

