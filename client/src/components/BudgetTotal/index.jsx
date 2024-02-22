function BudgetTotal() {

  function setTwoPlaceDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
  };

  return (
    <div className="form">
      <div className="form-Group">
        <label for="budgetInput">This Month's Budget:</label>
        <div className="row">
          <span className="col-2">
            <input type="number" min="0" step="any" onchange="setTwoPlaceDecimal" className="form-control" id="inputBudget" placeholder="Enter Amount"></input>
          </span>
          <span className="col-1">
            <i className="bi bi-pencil-square"></i>
          </span>
        </div> 
        <small id="leftToBudget" className="form-text">You Have x amount Left to Budget</small>
      </div>
    </div>
  );
};

export default BudgetTotal;