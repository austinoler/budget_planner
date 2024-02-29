import React, { useState } from 'react';

function ExpensesForm({ onSubmit }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Validate the form fields
    if (!category || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    // Pass the expense details to the parent component
    onSubmit({ "categoryName": category, amount, description });

    // Clear the form fields after submission
    setCategory('');
    setAmount('');
    setDescription('');
  };

  return (
    <div className="col-12 border border-1 border-success rounded p-4 mb-4 shadow">
      <h2>Add an Expense</h2>
      <div className="input-group">
        <select
          className="custom-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Housing">Housing</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Misc.">Misc.</option>
        </select>
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
          placeholder="Enter Amount"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="Add Description"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={handleSubmit}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpensesForm;
