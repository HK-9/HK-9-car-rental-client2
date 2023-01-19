import React from 'react';
import {Row,Col,Form,Input} from 'antd';
import logo1 from '../../assets/logo1.png';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../redux/actions/userActions';
import { requestOtp } from '../../redux/actions/otpActions';
import axios from 'axios';
import firebase from '../../firebase/firebase';
import './register.css'
import Spinner from '../../components/Spinner/Spinner';

function Register() {
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.alertsReducer);
  async function onFinish(values){
    const email = values.email;
    await dispatch(requestOtp(values));
    await dispatch(userRegister(values));
       console.log(values);
  }

  return (
    <div className='login'>
      {loading && (<Spinner/>)};
      <Row>
        <Col lg={16}>
          <div className='login-banner' />
        </Col>
        <Col lg={8} className = 'text-left'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
            <div className='login-logo'>
            <img src={logo1} alt="logo" />
            </div>
            <h3>REGISTER</h3>
            <hr />
                <Form.Item name='username' label='User Name' rules={[{required:true}]}>
                  <Input />
                </Form.Item>  
                <Form.Item name='phone' label='Phone' rules={[{required:true}]}>
                  <Input />
                </Form.Item> 
                <Form.Item name='email' label='Email' rules={[{required:true}]}>
                  <Input />
                </Form.Item> 
                
                <Form.Item 
                    name='password' label='Password' rules={[{required:true}]} hasFeedback>
                  <Input.Password />
                </Form.Item>

                <Form.Item 
                    name='cpassword'
                    label='Confirm Password' 
                    rules={[
                      {required:true},
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                    ]} 
                    dependencies={['passoword']}
                    hasFeedback>
                  <Input.Password />
                </Form.Item>  

                <button className="button-62 mb-3">Register </button>   
                {/* <button className="button-62 mb-3" role="button" onClick={handleClick}>Request OTP </button>    */}
                 <br />
                <Link className='login-link mt-5' to='/login'>Click Here to Login</Link>

          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
