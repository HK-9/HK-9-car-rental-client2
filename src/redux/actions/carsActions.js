import { message } from 'antd';
    import useAxiosPrivate from '../../hooks/useAxiosPrivate'
    import axios from 'axios';
    import { useQuery } from 'react-query';
// const API = axios.create({baseURL:"https://rentx-api-e9zj.onrender.com" })
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem("user")) {
//       req.headers.Authorization = `Bearer ${JSON.parse(
//         localStorage.getItem("user")
//       ).token}`;
//     }
//     return req;
//   });

export const getAllCars =(data)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})
    
    try {
    const response = data;
    // const {data} = useQuery('fetchcar',()=>{
    //     const axiosPrivate = useAxiosPrivate()
    //     return axiosPrivate.get('/api/cars/getallcars');
    // }) 
    // console.log(data.data)
    dispatch({type:'GET_ALL_CARS',payload:response});
    dispatch({type: 'LOADING' , payload:false});  

} catch (error) {
    if(error.response.status === 401) message.error('401 Authorization credentials missing, please login again');
    if(error.response.status === 500) message.error('500 Internal Server Error, Please try again');
    if(error.response.status === 403) message.error('403 Authorization failed, please login again')
    console.log('catch block @getallcars actions',error);
    dispatch({type: 'LOADING' , payload:false});
}
}
export const addCar = (reqObj) => async dispatch => {
    dispatch({type: 'LOADING', payload:true});

    try {
        // await axios.post('/api/cars/addcar',reqObj);
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