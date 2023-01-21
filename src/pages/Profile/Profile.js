import React, { useState } from "react";
import axios from "axios";
import './profile.css'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  MailOutlined,
  MobileOutlined,
  LockOutlined,
  SettingOutlined,PoweroffOutlined
} from "@ant-design/icons";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { Avatar,Breadcrumb, Layout, Menu, theme, Row, Col, Card, Button, Input,Form } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Footnote } from "../../containers";
import { Uploader } from "../../components/index";
const { Header, Content, Sider } = Layout;

// axios.defaults.baseURL="https://rentx-api-e9zj.onrender.com"


  function Profile() {
    const navigate = useNavigate();
    const [data,setData] = useState(null);
    const logoutCall = async () => {
        try {
          const response = await axios.get('/api/users/logout')
          setData(response.data);
        } catch (error) {
          
        }
      }  
      const user = JSON.parse(localStorage.getItem('user'));
      const username = user.data.user.username;
      const email = user.data.user.email;
      const phone = user.data.user.phone;

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
}
    
const [collapsed, setCollapsed] = useState(false);
const {
  token: { colorBgContainer },
} = theme.useToken();

  return (
    <div>
        <DefaultLayout />
      <Layout>
        <Layout >
        <Sider trigger={null} collapsible collapsed={collapsed}
        className='bs1'
        >

        <div className="logo" />
        <Menu
            onClick={({key})=>{
                if(key === '/logout'){
                    localStorage.removeItem('user');
                    logoutCall();
                  window.location.href='/login';
                }else{
                    navigate(key);
                }
            }}
            style={{
                textAlign:'left',
            }}
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '/profile',
              icon: <UserOutlined />,
              label: 'Profile',
            },
            {
              key: '/changepassword',
              icon: <LockOutlined />,
              label: 'Change Password',
            },
            {
              key: '/settings',
              icon: <SettingOutlined />,
              label: 'Settings',
            },   
             {
                key: '/logout',
                icon: <PoweroffOutlined />,danger:true,
                label: 'Log Out',
              },
            
          ]}
        />
      </Sider>
          <Layout
  
          >
            <Breadcrumb
              style={{
                paddingLeft:'2rem',
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item> <a href="/">Home</a> </Breadcrumb.Item>
              <Breadcrumb.Item> <a href="/home">Fleet</a></Breadcrumb.Item>
              <Breadcrumb.Item> My Profile</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                paddingBottom:"5rem",
                margin: 0,
                minHeight: 300,
                display:'flex',
                justifyContent:'center'
                
              }}
            >
               
                <Card className="bs1"
      title="My Profile"
      style={{
        width: "50%",
        fontWeight:'500',
      }}
    >

<Row>
    <Col lg={12}>
        <Form
            onFinish={onFinish}
        >
            <Form.Item> 
                <Input prefix={<UserOutlined/>} placeholder={username}/>
            </Form.Item>
            <Form.Item> 
                <Input prefix={<MobileOutlined />} placeholder={phone}/>
            </Form.Item>
            <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button style={{backgroundColor:'black'}} type='primary' htmlType="submit">
          Save All
        </Button>
      </Form.Item>
        </Form>
    </Col>
    <Col lg={12}>
    <Avatar size={80} icon={<UserOutlined />} /> <br />
        <div className="mt-3">
            <Uploader /> <br />
        </div>
    </Col>
</Row>
    </Card>

            </Content>
          </Layout>
        </Layout>
      <Footnote />
      </Layout>
    {/* <Contents /> */}

    </div>
  );
}
// function Contents(){
//     return(
//         <>
//         <Routes>
//             <Route path="/" element={ <div>Home</div> }></Route>
//             <Route path="/changepassword" element={ <div>Change Password</div> }></Route>
//             <Route path="/settings" element={ <div>settings</div> }></Route>
//             <Route path="/" element={ <div>Home</div> }></Route>
//         </Routes>
//         </>
//     )
// }


export default Profile;
