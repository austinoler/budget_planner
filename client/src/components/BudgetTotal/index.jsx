function BudgetTotal() {

  function setTwoPlaceDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
  }; 
  return (
  // Form that will allow user to input their total budget for the month  
    <div className="form justify-content-center">
      <div className="form-Group text-center">
        <label for="budgetInput" className="fs-4">This Month's Budget:</label>
        <div className="row justify-content-center">
          <span className="col-1 w-auto fs-4">$</span>
          <span className="col-2 w-25">
            <input type="number" min="0" step="any" onchange="setTwoPlaceDecimal" className="form-control" id="inputBudget" placeholder="Enter Amount"></input>
          </span>
          <span className="col-1 w-auto">
            <i className="bi bi-pencil-square"></i>
          </span>
        </div> 
        <small id="leftToBudget" className="form-text">You Have x amount Left to Budget</small>
      </div>
    </div>
  );
};

export default BudgetTotal;