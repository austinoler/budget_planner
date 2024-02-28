import React, { useState } from 'react';
import '../../App.css';

function BudgetTable() {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newBudgets, setNewBudgets] = useState({
    Housing: '1000',
    Food: '500',
    Transportation: '300',
    Misc: '200'
  });
  const [currentBudgets, setCurrentBudgets] = useState({
    Housing: '1000',
    Food: '500',
    Transportation: '300',
    Misc: '200'
  });

  const handleBudgetClick = (category) => {
    setEditingCategory(category);
  };

  const handleInputChange = (e, category) => {
    setNewBudgets(prevState => ({
      ...prevState,
      [category]: e.target.value
    }));
  };

  const handleBlur = (category) => {
    setCurrentBudgets(prevState => ({
      ...prevState,
      [category]: newBudgets[category]
    }));
    setEditingCategory(null);
     saveBudget(category, newBudgets[category]);
  };

  return (
    <div className="border border-1 border-success rounded p-4 mb-4 shadow">
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
        {Object.entries(currentBudgets).map(([category, budget]) => (
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
                budget // Display the current budget value when not in edit mode
              )}
            </td>
            <td>0000</td>
            <td>0000</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default BudgetTable;