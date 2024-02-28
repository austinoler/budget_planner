import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_BUDGET } from '../utils/queries';
import { getExpenses } from '../utils/helpers';

const Budget = () => {
    const { id } = useParams();
    console.log(id);

    const { loading, data: budget } = useQuery(QUERY_BUDGET, {
        variables: { id },
    }); 

    if(loading){
        return (<h1>Loading . . .</h1>)
    }
    
    const categories = budget.budget.categories
    console.log(categories);
    const expenses = getExpenses(categories);
 
}   

export default Budget;