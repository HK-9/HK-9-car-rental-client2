import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row,Col,Form,Input} from 'antd';
import logo1 from '../../assets/logo1.png';
import {Link} from 'react-router-dom';
import { userLogin } from '../../redux/actions/userActions';
import Spinner from '../../components/Spinner/Spinner';
import './login.css';
function Login() {

  const {loading} = useSelector(state=>state.alertsReducer);
  const dispatch = useDispatch()
   function onFinish(values){
   dispatch(userLogin(values));
    console.log(values)  
}
  return (
    <div className='login'>
      {loading === true && (<Spinner />)}
      <Row gutter={16} className='m-0 p-0'>
        <Col lg={16} className='m-0 p-0`'>
          <div className='login-banner' />
        </Col>
        <Col lg={8} className = 'text-left'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
            <div className='login-logo'>
            <img src={logo1} alt="logo" />
            </div>
            <h3 style={{color:'white'}}>LOGIN</h3>
            <hr />
                <Form.Item name='username' label='Username' rules={[{required:true}]}>
                  <Input />
                </Form.Item> 
                <Form.Item name='password' label='Password' rules={[{required:true}]}>
                  <Input.Password />
                </Form.Item>
                  <label htmlFor=""></label>
                  <div className='login-btn'>
                    {loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : <button className="button-62 mb-3">Login</button>}
                 
                  </div>
                <br/>
                  <Link className='register-link' to='/register'>Not Registered? Click To Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login


 