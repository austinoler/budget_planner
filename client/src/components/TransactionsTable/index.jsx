import React from 'react';

function TransactionsTable({ expenses }) {
  // Group expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.categoryName]) {
      acc[expense.categoryName] = [];
    }
    acc[expense.categoryName].push(expense);
    return acc;
  }, {});
  console.log('expenses :' , expenses);
  return ( 
    <div className="col-6 border border-1 border-success rounded p-4 mb-4 shadow bg-light">
      <h2 className="border border-1 border-success rounded p-2"><i className="bi bi-calculator"></i> Transactions</h2>
      <div id="accordion" className= "border border-1 border-dark rounded">
        {Object.entries(groupedExpenses).map(([category, categoryExpenses], index) => (
          <div key={index} className="card w-100 mt-2">
            <div className="card-header" id={`heading${index}`}>
              <h5 className="mb-0">
                <button className="btn btn-link" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                  <h3>{category}</h3>
                </button>
              </h5>
            </div>
            <div id={`collapse${index}`} className="collapse show" aria-labelledby={`heading${index}`} data-parent="#accordion">
              <div className="card-body text-start">
                {categoryExpenses.map((expense, index) => (
                  <div key={index}>
                      <h4><i className="bi bi-receipt"></i> {expense.description ? `${expense.description}: ` : ''} ${expense.amount}</h4><br />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionsTable;
