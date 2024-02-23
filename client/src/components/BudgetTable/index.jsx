function BudgetTable() {
  function housingBudgetVariance() { 
    var housingBudget = parseInt(document.getElementById("housing-budget").value);
    var housingExpense = parseInt(document.getElementById("housing-expense").value);
 
    var housingVariance = document.getElementById("housing-variance");
      housingVariance.value = housingBudget - housingExpense;
  };
  return (
  // Table that will display user's budget categorie/ amount, expenses, and budget variance  
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
      <tr>
        <th scope="row">Housing</th>
        < div className= "form-group">
          <input type="number" name="housing-budget-input" id="housing-budget"></input>
        </div>
        <td id="housing-expenses" onchange="housingBudgetVariance()">50</td>
        <td id="budget-variance">0000</td>
      </tr>
      <tr>
        <th scope="row">Food</th>
        < div className= "form-group">
          <input type="number" name="food-budget-input" id="food-budget"></input>
        </div>
        <td id="food-expenses">0000</td>
        <td id="food-variance">0000</td>
      </tr>
      <tr>
        <th scope="row">Transportation</th>
        <td id="transportation-budget">0000</td>
        <td id="transportation-expenses">0000</td>
        <td id="transportation-variance">0000</td>
      </tr>
      <tr>
        <th scope="row">Misc.</th>
        <td id="misc-budget">0000</td>
        <td id="misc-expenses">0000</td>
        <td id="misc-variance">0000</td>
      </tr>
    </tbody>
  </table>
  );
};

export default BudgetTable;