import React from 'react';
import logo1 from '../../assets/logo1.png';
import './defaultlayout.css'
import { Button, Dropdown, Space, Row, Col } from 'antd';
import { DownOutlined, UserOutlined, KeyOutlined,PoweroffOutlined,LayoutOutlined, LockOutlined } from '@ant-design/icons';
import{Person} from 'react-bootstrap-icons'
import { useState } from 'react';
import axios from 'axios';
import {HomeOutlined} from '@ant-design/icons'
// axios.defaults.baseURL="https://rentx-api-e9zj.onrender.com"

function DefaultLayout(props){
    const [data,setData] = useState(null);

    //-----logout-----
    const logoutCall = async () => {
      try {
        const response = await axios.get('/api/users/logout')
        setData(response.data);
      } catch (error) {
        
      }
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.data.user.username;
    let items = [
        {
          key: '1',
          label: (
            <a href="/profile">
              Profile
            </a>
          ),icon:(<LayoutOutlined />)
        },
        {
          key: '2',
          label: (
            <a href="/admin">
              Admin
            </a>
          ),
          icon:(<LockOutlined />)
        },
        {
            
            key: '3',
            label: (
                <li onClick={()=>{
                  localStorage.removeItem('user');
                  logoutCall();
                  window.location.href='/login';
                }}>Logout</li>
            ),
            icon:(<PoweroffOutlined style={{color:'red'}}/>),
          }
    ];
    return(
        <>
            <div className='header bs1'>
              <Row gutter={{}}>
                <Col  lg={24} sm={24} xs={24}>
                <div className='d-flex justify-content-between'>
                <div className='retx__nabar-logo'>
                <img className='navbar_logo' src={logo1} alt="logo" />
                </div>
                <div className='rentx__navbar-links_container'>
                    {/* <p><a href="#Home">Home</a></p> */}
                </div>

                <div className='rentx__navbar-user d-flex'>
                <div className='navbar-link mt-3'>
                       <a href="/home">
                      <p className='navbar-link-txt-home'><HomeOutlined className="navbar-link-logo" style={{color:'orange'}}/> Home </p> 
                       </a>
                      <p className='navbar-link-txt'>|</p>
                       <a href="/userbookings">
                      <p className='navbar-link-txt'>Bookings</p>
                       </a>
                      </div>
                <Space direction="vertical" >
                    <Space wrap>
                      
                    <Dropdown 
                        menu={{
                        items,
                        }}
                        placement="bottom"
                        style={{backgroundColor:'red'}}
                    >
                      {/* <Button placement="bottom" icon={<UserOutlined className='mb-2'/>}>{username} </Button> */}
                        <Button className='navbar_user_btn p-0 m-0'><UserOutlined className='ml-4 mr-2 mt-2'/> <span className="mt-1 mr-2 ">{username}</span></Button>
                    </Dropdown>
                    </Space>
                </Space>
                </div>
               </div>
                </Col>
              </Row>
              
            </div>
            <div className='content'>
                {props.childern}
            </div>
        </>
    )
}

export default DefaultLayout;