import React from 'react';
import processedData from './ExpensesByBudget';

const getExpensesByBudgetAndCategories = (processedData) => {

    // Process the GraphQL data
    // const { budget } = data;
    const groupedExpenses = {};
  
    // Group expenses by category
    processedData.budget.categories.forEach(category => {
      groupedExpenses[category._id] = {
        categoryName: category.name,
        months: {}
      };
  
      // Group expenses by month within category
      category.expenses.forEach(expense => {
        if (!groupedExpenses[category._id].months[expense.month]) {
          groupedExpenses[category._id].months[expense.month] = [];
        }
  
        groupedExpenses[category._id].months[expense.month].push(expense);
      });
  
      // Calculate total expenses by month for each category
      Object.keys(groupedExpenses[category._id].months).forEach(month => {
        const totalAmount = groupedExpenses[category._id].months[month].reduce((total, expense) => total + expense.amount, 0);
        groupedExpenses[category._id].months[month] = {
          expenses: groupedExpenses[category._id].months[month],
          totalAmount
        };
        
        // Sort expenses within each month by day
        groupedExpenses[category._id].months[month].expenses.sort((a, b) => a.day - b.day);
      });
    });
  
    // return (
    //   <div>
    //     {Object.keys(groupedExpenses).map(categoryId => (
    //       <div key={categoryId}>
    //         <h2>{groupedExpenses[categoryId].categoryName}</h2>
    //         {Object.keys(groupedExpenses[categoryId].months).map(month => (
    //           <div key={month}>
    //             <h3>{month}</h3>
    //             <ul>
    //               {groupedExpenses[categoryId].months[month].expenses.map(expense => (
    //                 <li key={expense._id}>
    //                   {expense.description} - ${expense.amount}
    //                 </li>
    //               ))}
    //             </ul>
    //             <p>Total Expenses: ${groupedExpenses[categoryId].months[month].totalAmount}</p>
    //           </div>
    //         ))}
    //       </div>
    //     ))}
    //   </div>
    // );
  };
  
  export default getExpensesByBudgetAndCategories;