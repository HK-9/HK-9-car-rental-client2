import axios from 'axios'
import {message} from 'antd'


// axios.defaults.baseURL="https://rentxcar.gamexonline.store"
axios.defaults.baseURL="https://rentx-api-e9zj.onrender.com"



export const getAllNotifications = ()=>async (dispatch)=>{

    dispatch({type: 'LOADING' , payload:true})
try {
    const user = localStorage.getItem('user');
    const response = await axios.get('/api/admin/getallnotifications');
    dispatch({type:'GET_ALL_NOTIFICATIONS',payload:response.data}); 
    dispatch({type: 'LOADING' , payload:false});  

} catch (error) {
    if(error.response.status === 401) message.error('Unauthorized access, Please login again');
    console.log('@notifications actions ',error);
    dispatch({type: 'LOADING' , payload:false});
}
}   