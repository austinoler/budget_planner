import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CATEGORY } from '../../utils/queries';
import { UPDATE_BUDGET } from '../../utils/mutations';
import AuthService from '../../utils/auth';
import '../../App.css';

function BudgetTable() {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newBudgets, setNewBudgets] = useState({
    Housing: '',
    Food: '',
    Transportation: '',
    Misc: ''
  });

  const { loading, error, data } = useQuery(QUERY_CATEGORY, {
    variables: {
      userId: AuthService.getUserId(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }
  });

  const [updateBudget] = useMutation(UPDATE_BUDGET);

  useEffect(() => {
    if (data) {
      const initialBudgets = {};
      data.category.forEach((budget) => {
        initialBudgets[budget.name] = budget.budget || ''; // Set to empty string if budget is not available
      });
      setNewBudgets(initialBudgets);
    }
  }, [data]);

  const handleBudgetClick = (category) => {
    setEditingCategory(category);
  };

  const handleInputChange = (e, category) => {
    setNewBudgets(prevState => ({
      ...prevState,
      [category]: e.target.value
    }));
  };

  const handleBlur = async (category) => {
    setEditingCategory(null);

    try {
      await updateBudget({
        variables: {
          userId: AuthService.getUserId(),
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          name: category,
          budget: parseFloat(newBudgets[category])
        }
      });
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table className="table">
      <thead>
        <tr className="col">
          <th scope="col" className="w-25">Category</th>
          <th scope="col" className="w-25">Budget $</th>
          <th scope="col" className="w-25">Expenses $</th>
          <th scope="col" className="w-25">Budget Variance $</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(newBudgets).map((category) => (
          <tr key={category}>
            <th scope="row">{category}</th>
            <td
              onClick={() => handleBudgetClick(category)}
              className={editingCategory === category ? '' : 'hover-effect'}
            >
              {editingCategory === category ? (
                <input
                  type="number"
                  value={newBudgets[category]}
                  onChange={(e) => handleInputChange(e, category)}
                  onBlur={() => handleBlur(category)}
                  autoFocus
                />
              ) : (
                newBudgets[category]
              )}
            </td>
            <td>0000</td>
            <td>0000</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BudgetTable;



