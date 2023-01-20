import axios from 'axios'
import {message} from 'antd'

//book a car
//  axios.defaults.baseURL="https://rentxcar.gamexonline.store"
axios.defaults.baseURL="https://rentx-api-e9zj.onrender.com"


export const bookCar =(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

try {
    await axios.post('/api/bookings/bookcar',reqObj);
    dispatch({type: 'LOADING' , payload:false});  
    message.success('Your car booked successfully');
} catch (error) {
    if(error.response.status === 401) message.error('unauthorized access');
    console.log('catch block @bookingActions',error);
    dispatch({type: 'LOADING' , payload:false});
    message.error('OOPS, Something went wrong, please try later')
    }
}    

//get all bookings
export const getAllBookings =()=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})
try {
    const user = localStorage.getItem('user');
    const response = await axios.get('/api/bookings/getallbookings');
    dispatch({type:'GET_ALL_BOOKINGS',payload:response.data}); 
    dispatch({type: 'LOADING' , payload:false});  

} catch (error) {
    if(error.response.status === 401) message.error('Unauthorized access, Please login again');
    console.log('@bookings api actions ',error);
    dispatch({type: 'LOADING' , payload:false});
}
}   

export const cancelBooking =(bookingid,carid)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})
    message.success('Booking cancelled successfully')
try {
    await axios.post('/api/bookings/cancelbooking',{bookingid,carid});
    dispatch({type: 'LOADING' , payload:false});  
    window.location.reload();
} catch (error) {
    if(error.response.status === 401) message.error('unauthorized access');
    console.log('@cancel bookings action ',error);
    message.error('oops, Something went wrong..')
    dispatch({type: 'LOADING' , payload:false});
}
}  

