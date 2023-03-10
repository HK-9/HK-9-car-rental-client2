import { message } from 'antd';
import { axiosPrivate } from '../../api/axios';
import axios from 'axios';

// axios.defaults.baseURL="https://rentxcar.gamexonline.store"
// const user = JSON.parse(localStorage.getItem('user'))   
const API = axios.defaults.baseURL="https://rentx-api-e9zj.onrender.com" 
API.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
      req.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem("user")
      ).token}`;
    }
    return req;
  });

export const getAllCars =()=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

try {
    const response = await  API.get('/api/cars/getallcars');
    dispatch({type:'GET_ALL_CARS',payload:response.data});
    dispatch({type: 'LOADING' , payload:false});  

} catch (error) {
    if(error.response.status === 401) message.error('unauthorized access');
    if(error.response.status === 500) message.error('Internal Server Error, Please try again')
    console.log('catch bolock',error);
    dispatch({type: 'LOADING' , payload:false});
}
}   


export const addCar = (reqObj) => async dispatch => {
    dispatch({type: 'LOADING', payload:true});

    try {
        await axios.post('/api/cars/addcar',reqObj);
        dispatch({type: 'LOADING', payload:false});
        message.success('Car added successfully')
        setTimeout(()=>{
            window.location.href='/admin';
        },500)
    } catch (error) {
        if(error.response.status === 401) message.error('unauthorized access');
        console.log('check cars actions :catch block',error);
         message.error('OOPS, Something went wrong, please try later')
        dispatch({type: 'LOADING' , payload:false});
    }
}

export const editCar = (reqObj) => async dispatch => {
    dispatch({type: 'LOADING', payload:true});

    try {
         await axios.post('/api/cars/editcar',reqObj);
        dispatch({type: 'LOADING', payload:false});
        message.success('Car details updated successfully')
        setTimeout(()=>{
            window.location.href='/admin';
        },500)
    } catch (error) {
        if(error.response.status === 401) message.error('unauthorized access');
        console.log('check cars actions :catch block',error);
        message.error('OOPS, Something went wrong, please try later');
        dispatch({type: 'LOADING' , payload:false});
    }
}

export const deleteCar = (reqObj) => async dispatch => {
    dispatch({type: 'LOADING', payload:true});

    try {
        await axios.post('/api/cars/deletecar',reqObj);
        dispatch({type: 'LOADING', payload:false});
        message.success('Car deleted successfully')
        setTimeout(()=>{
            window.location.reload();
        },500)
    } catch (error) {
        if(error.response.status === 401) message.error('unauthorized access');
        console.log('check cars actions :catch block',error);
        message.error('OOPS, Something went wrong, please try later');
        dispatch({type: 'LOADING' , payload:false});
    }
}