import React from 'react';

function TransactionsTable({ expenses }) {
  // Group expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {});

  return ( 
    <div>
      <div className="fs-3">Transactions</div>
      <div id="accordion">
        {Object.entries(groupedExpenses).map(([category, categoryExpenses], index) => (
          <div key={index} className="card w-50">
            <div className="card-header" id={`heading${index}`}>
              <h5 className="mb-0">
                <button className="btn btn-link" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                  {category}
                </button>
              </h5>
            </div>
            <div id={`collapse${index}`} className="collapse show" aria-labelledby={`heading${index}`} data-parent="#accordion">
              <div className="card-body text-start">
                {categoryExpenses.map((expense, index) => (
                  <div key={index}>
                    - {expense.description ? `${expense.description}: ` : ''} ${expense.amount}<br />
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
