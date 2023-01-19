import axios from 'axios';
import {message} from 'antd'

export const getdashboard = ()=>async (dispatch)=>{
    dispatch({type: 'LOADING' , payload:true})
try {
    const response = await axios.get('/api/admin/getdashboard');
    dispatch({type:'GET_DASHBOARD',payload:response.data}); 
    console.log("respose from dashboard action:",response);
    dispatch({type: 'LOADING' , payload:false});  

} catch (error) {
    console.log('@dashboard actions ',error);
    if(error.response.status === 401) message.error('Unauthorized access, Please login again');
    if(error.response.status === 400) message.error('Internal server erro, Please try again later');
    dispatch({type: 'LOADING' , payload:false});
}
}   