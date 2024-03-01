import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_BUDGET } from '../../utils/mutations';
import { QUERY_BUDGET } from '../../utils/queries';
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

    // update the user's total budget to the database
    await updateBudget({
      variables: {
        id: props.id,
        total: parseFloat(totalBudget)
      }
    })

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

        <div className="d-flex align-items-center justify-content-center rounded p-4 mb-4 bg-light">
          <div className="form-Group text-center">
            <h2><label htmlFor="inputBudget">Budget Total:</label></h2>
            <div className="row justify-content-center">
              <span className="col-1 w-auto fs-4">$</span>
              <span className="col-4 w-50">
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
              </span>
            </div>
          </div>
        </div>
      ) : (


        <div className="bg-image opacity-75 shadow col"
          style={{
            backgroundImage: "url(/assets/images/budget-total-bg.jpg)",
            height: "auto",
            width: "auto",
            bakgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            WebkitBackgroundSize: 'cover',
            MozBackgroundSize: 'cover',
            OBackgroundSize: 'cover',

          }}>
          <div className="d-flex align-items-center flex-column justify-content-center rounded p-4 mb-4">
            {/* Display the message once the budget has been submitted */}
            <h1 className="text-center justify-content-center bg-light w-50 rounded">Budget Total:  <div className="text-danger">${totalBudget}</div> <i className=" bi bi-pencil-square" onClick={handleEditClick}> edit</i></h1>
            {/* Show the edit button */}

          </div>
        </div>
      )}

    </>
  );
}

export default BudgetTotal;

