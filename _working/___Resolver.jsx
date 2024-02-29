
const getExpensesByBudgetAndCategories = (processedData) => {
    // const groupedExpenses = {};

    console.log('processedData:', processedData);

    const { budget: { categories } } = processedData;

    return (
      <div>
        <h2>Expense List</h2>
        {categories.map(category => (
          <div key={category._id}>
            <h3>{category.budget}</h3>
            <ul>
              {category.expenses.map(expense => (
                <li key={expense._id}>
                  <p>Category: {expense.categoryName}</p>
                  <p>Description: {expense.description}</p>
                  <p>Date: {expense.month} {expense.day}</p>
                  <p>Amount: ${expense.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default getExpensesByBudgetAndCategories;