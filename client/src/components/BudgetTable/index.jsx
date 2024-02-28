import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CATEGORY } from '../../utils/queries';
import { UPDATE_CATEGORY } from '../../utils/mutations'; // Import UPDATE_CATEGORY mutation
import AuthService from '../../utils/auth';

function BudgetTable() {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newBudgets, setNewBudgets] = useState({
    Housing: '',
    Food: '',
    Transportation: '',
    Misc: ''
  });

  // const { loading, error, data } = useQuery(QUERY_CATEGORY, {
  //   variables: {
  //     userId: AuthService.getUserId(),
  //     month: new Date().getMonth() + 1,
  //     year: new Date().getFullYear(),
  //   }
  // });
  
  const [updateCategory] = useMutation(UPDATE_CATEGORY); // Use UPDATE_CATEGORY mutation

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

  const handleBlur = async (category, categoryId) => { // Pass categoryId as argument
    setEditingCategory(null);

    try {
      await updateCategory({
        variables: {
          _id: categoryId, // Pass categoryId to updateCategory mutation
          budget: parseFloat(newBudgets[category]) // Convert input value to float
        }
      });
    } catch (error) {
      console.error('Error updating category budget:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="border border-1 border-success rounded p-4 mb-4 shadow">
    <table className="table">
      {/* Table body */}
    </table>
    </div>
  );
}

export default BudgetTable;




