import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_BUDGET } from '../utils/queries';


const Budget = () => {
    const { id } = useParams();
    console.log(id);
    const { loading, data } = useQuery(QUERY_BUDGET, {
        variables: { id },
    });

    if(loading){
        return (<h1>Loading . . .</h1>)
    }
    console.log(data);
}   

export default Budget;