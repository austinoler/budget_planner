import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import Auth from '../utils/auth'
import Signup from './Signup';
import Login from './Login';
import { useMutation,  } from '@apollo/client';
import { ADD_BUDGET, ADD_CATEGORY } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';




const Budget = () => {
    const [addBudget] = useMutation(ADD_BUDGET);
    const [addCategory] = useMutation(ADD_CATEGORY,
        {refetchQueries: [
            QUERY_USER,
            'getUser'
          ]});

    const navigate = useNavigate();

    if (!Auth.loggedIn()) {
        return (
            <div className="row shadow rounded border border-3 p-4">
                <Login />
                <h2 className="col-2 align-self-center">OR</h2>
                <Signup />
            </div>
        );
    }

    // Check if the current loggedin user has a budget for this month. If not, create one with default amount of 500
    var userId = Auth.getProfile().data._id
    const currentDate = new Date;
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const [totalBudget, setTotalBudget] = useState('');
    const [housingBudget, setHousingBudget] = useState('');
    const [foodBudget, setFoodBudget] = useState('');
    const [transportationBudget, setTransportationBudget] = useState('');
    const [miscBudget, setMiscBudget] = useState('');
    // const [error, setError] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission, e.g., call a function to process budget data
        const total = parseFloat(totalBudget);
        const housing = parseFloat(housingBudget);
        const food = parseFloat(foodBudget);
        const transportation = parseFloat(transportationBudget);
        const misc = parseFloat(miscBudget);

        // const sumOfBudgets = housing + food + transportation + misc;
        // if (total !== sumOfBudgets) {
        //     setError('Budgets must add up to the total budget amount.');
        //     return;
        // };

        const budget = await addBudget({
            variables: { userId, month, year, total: parseFloat(totalBudget) },
            
        })
        const budgetId = budget.data.addBudget._id;

        await addCategory({
            variables: { userId, name: 'Housing', budget: parseFloat(housingBudget), budgetId }
        });
        
        await addCategory({
            variables: { userId, name: 'Food', budget: parseFloat(foodBudget), budgetId }
        });

        await addCategory({
            variables: { userId, name: 'Transportation', budget: parseFloat(transportationBudget), budgetId }
        });

        await addCategory({
            variables: { userId, name: 'Misc', budget: parseFloat(miscBudget), budgetId }
        });
        navigate(`/home/${budgetId}`);
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Create New Budget</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            {/* {error && <div className="alert alert-danger">{error}</div>} */}
                            <label htmlFor="totalBudget" className="form-label">Total Budget Amount</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                className="form-control"
                                id="totalBudget"
                                value={totalBudget}
                                onChange={(e) => setTotalBudget(e.target.value)}
                                placeholder="Enter Total Budget Amount"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="housingBudget" className="form-label">Housing Budget</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                className="form-control"
                                id="housingBudget"
                                value={housingBudget}
                                onChange={(e) => setHousingBudget(e.target.value)}
                                placeholder="Enter Housing Budget"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="foodBudget" className="form-label">Food Budget</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                className="form-control"
                                id="foodBudget"
                                value={foodBudget}
                                onChange={(e) => setFoodBudget(e.target.value)}
                                placeholder="Enter Food Budget"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="transportationBudget" className="form-label">Transportation Budget</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                className="form-control"
                                id="transportationBudget"
                                value={transportationBudget}
                                onChange={(e) => setTransportationBudget(e.target.value)}
                                placeholder="Enter Transportation Budget"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="miscBudget" className="form-label">Miscellaneous Budget</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                className="form-control"
                                id="miscBudget"
                                value={miscBudget}
                                onChange={(e) => setMiscBudget(e.target.value)}
                                placeholder="Enter Misc Budget"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Budget;