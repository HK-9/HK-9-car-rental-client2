import React from 'react';
import logo1 from '../../assets/logo1.png';
import './navbar.css'
import { Button, Dropdown, Space, Row, Col } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import{Person,MenuAppFill} from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';


function DefaultLayout(props){
    return(
        <>
            <div className='header bs1'>
              <Row gutter={16}>
                <Col  lg={20} sm={24} xs={24}>
                <div className='d-flex justify-content-between'>
                <div className='retx__nabar-logo'>
                <img className='navbar_logo' src={logo1} alt="logo" />
                </div>
                <div className='rentx__navbar-links_container'>
                    {/* <p><a href="#Home">Home</a></p> */}
                <Link to={'/login'}>
                  <Button  className='navbar_user_btn mr-2'><Person className='ml-4 mr-2 mt-2'/> <span className="mt-1 mr-2 ">Login</span></Button>
                </Link> 
                <Link to={'/register'}> 
                  <Button  className='navbar_user_btn '><Person className='ml-4 mr-2 mt-2'/> <span className="mt-1 mr-2 ">Sign Up</span></Button>                
                </Link>   
                </div>
               </div>
               {/* <Button  className='navbar_menu_btn'><MenuAppFill /> <span className="mt-1 mr-2 "></span></Button> */}

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