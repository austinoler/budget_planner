import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BUDGET } from '../../utils/queries';
import { UPDATE_CATEGORY, UPDATE_BUDGET } from '../../utils/mutations'; // Import UPDATE_CATEGORY mutation

function BudgetTable(props) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newBudgets, setNewBudgets] = useState({
    Housing: '',
    Food: '',
    Transportation: '',
    Misc: ''
  });

  // run get budget query for the budget id that was clicked and get the related category data
  const { loading, error, data } = useQuery(QUERY_BUDGET, {
    variables: {
      id: props.id
    }
  });

  // extract the budget for each category and update the state variable
  useEffect(() => {
    if (data) {
      const categories = data.budget.categories;
      var Housing = 0, Food = 0, Transportation = 0, Misc = 0;
      categories.forEach(category => {
        if (category.name == 'Housing') {
          Housing += category.budget;
        } else if (category.name == 'Food') {
          Food += category.budget;
        } else if (category.name == 'Transportation') {
          Transportation += category.budget;
        } else if (category.name == 'Misc') {
          Misc += category.budget;
        }
        setNewBudgets({ Housing, Food, Transportation, Misc })
      });
    }
  }, [data]);

  const [updateCategory] = useMutation(UPDATE_CATEGORY); // Use UPDATE_CATEGORY mutation

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

    // pull out the right categoryId from state and update the category budget 
    var categoryId;
    switch(category) {
      case "Food":
        categoryId = props.categoryIDs.foodID;
        break;
      case "Housing":
        categoryId=props.categoryIDs.housingID;
        break;
      case "Transporation":
        categoryId=props.categoryIDs.transportationID;
        break;
      case "Misc":
        categoryId=props.categoryIDs.miscID;
        break;
    }

    try {
      await updateCategory({
        variables: {
          id: categoryId, // Pass categoryId to updateCategory mutation
          budget: parseFloat(newBudgets[category]) // Convert input value to float
        }
      });
    } catch (error) {
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="col-12 bg-light border border-1 border-success rounded p-4 mb-4 shadow">
      <table className="table border border-1 border-success rounded mb-0">
        {/* Table body */}
        <thead>
          <tr className="col">
            <th scope="col" className="w-25"><h4>Category</h4></th>
            <th scope="col" className="w-25"><h4>Budget $</h4></th>
            <th scope="col" className="w-25"><h4>Expenses $</h4></th>
            <th scope="col" className="w-25"><h4>Budget Variance $</h4></th>
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
            <td className ={ (newBudgets[category] - props.expensesByCat[category] >0)?"bg-success text-white p-0" : "bg-danger text-white p-0"}><div className='m-0 pt-2 pb-1 px-2 border border-1 border-white'>{newBudgets[category] - props.expensesByCat[category]}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BudgetTable;
