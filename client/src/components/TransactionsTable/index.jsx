
function TransactionsTable() {
  return ( 
    <div>
      <div className="fs-3">Transactions</div>
      <div id="accordion">
        <div className="card w-50">
          <div className="card-header" id="headingOne">
          <h5 className="mb-0">
        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Housing
        </button>
      </h5>
      </div>

    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div className="card-body text-start">
            - Added $1200 to Housing Budget<br></br>
            - Used $1200 from Housing Budget (Rent)
      </div>
    </div>
  </div>
  <div className="card w-50">
    <div className="card-header" id="headingTwo">
      <h5 className="mb-0">
        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Food
        </button>
      </h5>
    </div>
    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div className="card-body text-start">
        - dfhgbdfhbdfg<br></br>
      </div>
    </div>
  </div>
  <div className="card w-50">
    <div className="card-header" id="headingThree">
      <h5 className="mb-0">
        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Transportation
        </button>
      </h5>
    </div>
    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div className="card-body text-start">
        - dfhgbdfhbdfg<br></br>
      </div>
    </div>
  </div>
  <div className="card w-50">
          <div className="card-header" id="headingFour">
          <h5 className="mb-0">
        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
          Misc.
        </button>
      </h5>
      </div>

    <div id="collapseFour" className="collapse show" aria-labelledby="headingFour" data-parent="#accordion">
      <div className="card-body text-start">
        - dfhgbdfhbdfg<br></br>

      </div>
    </div>
  </div>
</div>

   
    </div>
  );
};

export default TransactionsTable;