import React from 'react'
// import DefaultLayout from '../../../components/NavBar/NavBar';
import './addcar.css';
import {Col,Row,Form,Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addCar } from '../../../redux/actions/carsActions';
import {Spinner,DefaultLayout} from '../../../components/index';


function AddCar() {
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.alertsReducer);

  function onFinish(values){
    values.bookedTimeSlotes = [];
    dispatch(addCar(values));
    console.log(values)
  }

  return (
    <div>
      <DefaultLayout />
        {loading === true && (<Spinner/>)} 
        <Row justify="center" className='mt-2'>
        <Col lg={12} sm={24} >
          <Form layout='vertical' className='login-form p-5 bs1' onFinish={onFinish} style={{backgroundColor:'white'}}>
            
            <h3 style={{}}>ADD CAR</h3>
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
                    {loading ? <div className="lds-ellipsis mt-5"><div></div><div></div><div></div><div></div></div> : <button className="button-62 mb-3">DEPLOY</button>}
                  </div>
                <br/>
                  {/* <Link className='register-link' to='/register'>Not Registered? Click To Register</Link> */}
          </Form>
        </Col>
        </Row>
    </div>
  )
}

export default AddCar
