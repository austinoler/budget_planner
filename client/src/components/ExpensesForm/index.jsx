function ExpensesForm() {
  return (
  // Form in which user can add an expense  
    <div className="col w-50">
      <div className="fs-4">Add an Expense</div>
      <div className="input-group">
        <select className="custom-select" id="inputGroupSelect04">
          <option selected>Select Category</option>
          <option value="1">Housing</option>
          <option value="2">Food</option>
          <option value="3">Transportation</option>
          <option value="4">Misc.</option>
        </select>
        <input type="number" min="0" step="any" className="form-control" aria-label="Text input with segmented dropdown button" placeholder="Enter Amount"></input>
        <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" placeholder="Add Description"></input>
      <div className="input-group-append">
      <button className="btn btn-outline-secondary" type="button">+</button>
    </div>
  </div>
</div>
  );
};

export default ExpensesForm;