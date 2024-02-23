function BudgetTable() {
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
        <td>0000</td>
        <td>0000</td>
        <td>0000</td>
      </tr>
      <tr>
        <th scope="row">Food</th>
        <td>0000</td>
        <td>0000</td>
        <td>0000</td>
      </tr>
      <tr>
        <th scope="row">Transportation</th>
        <td>0000</td>
        <td>0000</td>
        <td>0000</td>
      </tr>
      <tr>
        <th scope="row">Misc.</th>
        <td>0000</td>
        <td>0000</td>
        <td>0000</td>
      </tr>
    </tbody>
  </table>
  );
};

export default BudgetTable;