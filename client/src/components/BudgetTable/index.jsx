import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BUDGET } from '../../utils/queries';
import { UPDATE_CATEGORY } from '../../utils/mutations';
import AuthService from '../../utils/auth';
import { useParams } from 'react-router-dom';

const BudgetTable = (props) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newBudgets, setNewBudgets] = useState({
    Housing: '',
    Food: '',
    Transportation: '',
    Misc: ''
  });

  const { loading, error, data } = useQuery(QUERY_BUDGET, {
    variables: {
      id: props.id
    }
  });

  useEffect(() => {
    if (data) {
      console.log('Data:', data); // Log the fetched data
      const categories = data.budget.categories;
      var Housing = 0,
        Food = 0,
        Transportation = 0,
        Misc = 0;
      categories.forEach((category) => {
        if (category.name === 'Housing') {
          Housing += category.budget;
        } else if (category.name === 'Food') {
          Food += category.budget;
        } else if (category.name === 'Transportation') {
          Transportation += category.budget;
        } else if (category.name === 'Misc') {
          Misc += category.budget;
        }
        setNewBudgets({ Housing, Food, Transportation, Misc });
      });
    }
  }, [data]);

  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    console.log('Editing category in useEffect:', editingCategory);
  }, [editingCategory]);

  const handleBudgetClick = (category) => {
    console.log('Clicked category:', category);
    if (category) {
      setEditingCategory(prevCategory => {
        if (prevCategory === category) return prevCategory;
        return category;
      });
    } else {
      console.error('Error: category is null or undefined');
    }
  };

  const handleInputChange = (e, category) => {
    setNewBudgets((prevState) => ({
      ...prevState,
      [category]: e.target.value
    }));
  };

  const handleBlur = async (category) => {
    console.log('Editing category in handleBlur:', editingCategory);
    try {
      if (editingCategory && editingCategory._id) {
        const response = await updateCategory({
          variables: {
            id: editingCategory._id,
            budget: parseFloat(newBudgets[category])
          }
        });
        console.log('Mutation response:', response);
      } else {
        console.error('Error: editingCategory or editingCategory._id is null or undefined');
      }
    } catch (error) {
      console.error('Error updating category budget:', error);
    } finally {
      setEditingCategory(null); // Reset editingCategory regardless of success or failure
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="border border-1 border-success rounded p-4 mb-4 shadow">
      <table className="table">
        <thead>
          <tr className="col">
            <th scope="col" className="w-25">
              Category
            </th>
            <th scope="col" className="w-25">
              Budget $
            </th>
            <th scope="col" className="w-25">
              Expenses $
            </th>
            <th scope="col" className="w-25">
              Budget Variance $
            </th>
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
              <td>{props.expensesByCat[category]}</td>
              <td>{newBudgets[category] - props.expensesByCat[category]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;





