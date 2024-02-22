function BudgetForm() {
// Form in which user can add a budget amount to a selected category
  return(
    <div className="w-50">
      <div className="fs-4">Add to Budget</div>
      <div className="input-group">
        <select className="custom-select" id="inputGroupSelect04">
          <option selected>Select Category</option>
          <option value="1">Housing</option>
          <option value="2">Food</option>
          <option value="3">Transportation</option>
          <option value="4">Misc.</option>
        </select>
        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" placeholder="Enter Amount"></input>
        <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button">+</button>
        </div>
      </div>
    </div>
  );
};

export default BudgetForm;