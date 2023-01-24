import axios from '../../API/axios'
import {message} from 'antd'

//book a car
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
export const getAllBookings =(response)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})
try {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user',user.data.user)
    const userId = user.data.user._id
    // const data = user.data
    const response = await axios.get(`/api/bookings/getallbookings?userId=${userId}`);
    dispatch({type:'GET_ALL_BOOKINGS',payload:response.data}); 
    dispatch({type: 'LOADING' , payload:false});  

} catch (error) {
    if(error.response.status === 401) message.error('Unauthorized access, Please login again');
    if(error) message.error('Something went wrong please')
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

