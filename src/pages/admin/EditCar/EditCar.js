import React, { useState,useEffect } from 'react'
// import DefaultLayout from '../../../components/NavBar/NavBar';
import './editcar.css';
import {Col,Row,Form,Input} from 'antd';
import { useDispatch, useSelector} from 'react-redux';
import {editCar, getAllCars } from '../../../redux/actions/carsActions';
import {Spinner,DefaultLayout} from '../../../components/index';
import { useParams } from 'react-router-dom';

function EditCar(match) {
  const {cars} = useSelector(state=>state.carsReducer);
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.alertsReducer);
  const [car,setCar] = useState();
  const { id } = useParams();
  const [totalCars,setTotalCars] = useState([]); 
  
  useEffect(()=>{
    if (cars.length == 0) {
      dispatch(getAllCars());
    }else{
      setTotalCars(cars)
      setCar(cars.find((o) => o._id === id));
      {console.log('555555555555555',car)}
    }
  },[cars])

  function onFinish(values){
    values._id = car._id;
    dispatch(editCar(values));
    console.log(values)
  }
  
  return (
    <div>
      <DefaultLayout />
        {loading === true && (<Spinner/>)} 
        <Row justify="center" className='mt-2'>
        <Col lg={12} sm={24} >
            {totalCars.length>0 && (<Form initialValues={car} layout='vertical' className='login-form p-5 bs1' onFinish={onFinish} style={{backgroundColor:'white'}}>
            <h3 style={{}}>EDIT CAR</h3>
            <h7 style={{textTransform:'capitalize'}}>{car.name}</h7>
            <hr />
                <Form.Item name='name' label='Car name' rules={[{required:true}]}>
                  <Input />
                </Form.Item> 
                <Form.Item name='image' label='Image url' rules={[{required:true}]}>
                  <Input />
                </Form.Item> 
                <Form.Item name='rentPerHour' label='Rent per hour' rules={[{required:true}]}>
                  <Input />
                </Form.Item> 
                <Form.Item name='capacity' label='Capacity' rules={[{required:true}]}>
                  <Input />
                </Form.Item> 
                <Form.Item name='fuelType' label='Fuel Type' rules={[{required:true}]}>
                  <Input />
                </Form.Item> 
                <Form.Item name='category' label='Category' rules={[{required:true}]}>
                  <Input />
                </Form.Item>
                  <div className='login-btn'>
                    {loading ? <div className="lds-ellipsis mt-5"><div></div><div></div><div></div><div></div></div> : <button className="button-62 mb-3">MODIFY</button>}
                  </div>
                <br/>
                  {/* <Link className='register-link' to='/register'>Not Registered? Click To Register</Link> */}
          </Form>)}
        </Col>
        </Row>
    </div>
  )
}

export default EditCar
