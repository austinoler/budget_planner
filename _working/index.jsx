// import React from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_BUDGET } from '../../utils/queries';

// function DataVisualizations({id}) {
//   // test the value that was passed in

  
//   console.log(id);
  
//     // run get budget query for the budget id that was clicked and get the related category data
//     const { loading, error, data } = useQuery(QUERY_BUDGET, {
//       variables: {
//         id : id
//       }
//     });

//     if (loading) return <p>Loading...</p>;  
//     if (error) return <p>Error: {error.message}</p>;

//     // examine the results from the query
//     console.log(data);

//     // deconstruct the results from the query
//     const budget = data.budget;
//     const categories = budget.categories;
//     console.log(categories);
//     const expenses = budget.expenses;
//     console.log(expenses);


//     // loop through the data and display the results
//     return (
//       <div className="w-50 border border-1 border-success rounded p-4 mb-4 shadow">
//         <h2>Data Visualizations</h2>
//         <p>Here is where the data visualizations will go</p>
             
//       </div>
   
//   );
// };








// export default DataVisualizations;