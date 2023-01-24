import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Badge,message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { Row, Col, Tabs,Drawer, Space, Button ,Segmented, } from "antd";
import { AndroidOutlined, TabletOutlined , AppleOutlined,EyeOutlined,EyeInvisibleOutlined } from "@ant-design/icons";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import "./adminhome.css";
import { Spinner, DefaultLayout } from "../../../components/index";
import {Notifications, CarsManagement, BookingsManagement,Dashboard} from '../../index'
import Unauthorized from '../../Unathorized/Unathorized';
import { deleteCar } from "../../../redux/actions/carsActions";
import { getAllNotifications } from "../../../redux/actions/notificationActions";
import { getAllCars } from "../../../redux/actions/carsActions";
import Icon from "@ant-design/icons/lib/components/Icon";

function AdminHome() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.data?.user?.isAdmin; //admin access
  const  {notifications}  = useSelector((state)=>state.notificationsReducer);
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
console.log("object",isAdmin)
  useEffect(() => {  
    if(!isAdmin){
      message.error('Admin acces denied')
    }
    }, []);


  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');

  useEffect(() => {
    dispatch(getAllCars());
    dispatch(getAllNotifications())
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]); 
  const onChange = (key) => {

  };

  function handleDrawer(){
    setOpen(true);
  }
  const onClose = () => {
    setOpen(false);
  };
  return (
    isAdmin?
    <>
    <DefaultLayout />,
      <Row justify="center">
        <Col lg={20} md={20} sm={22}></Col>
      </Row>
      <Row justify="center"  className="mt-2">
        <Col lg={20} sm={24}>
          
        </Col>
      </Row>
      {loading == true && <Spinner />}

      <Row justify="center" className="">
        <Col lg={22} sm={22} xs={22}>
          <Tabs
            tabBarStyle={{ width: "100%"}}
            size="medium"
            defaultActiveKey="1"
            onChange={onChange}
            items={[
              {
                label: `Dashboard`,
                key: "1",
                children: <Dashboard/>,
              },
              {
                label: `Car Managemnt`,
                key: "2",
                children: <CarsManagement/>,
              },
              {
                label: `Driver Management`,
                key: "3",
                children: `Under development :(`,
              },
              {
                label: `Bookings`,
                key: "4",
                children: <BookingsManagement/>,
              },
            ]}
          />
        </Col>
 
          <span onClick={handleDrawer} style={{cursor:'pointer'}}>
            <Badge count={notifications?.notifications?.notifications.length} offset={[-4, 10]} >
                      <Avatar className="bs1" icon={<TabletOutlined />} />
              </Badge>
          </span>
      </Row>
      <Drawer
      
        title="Notification Center"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
           <Segmented
    options={[
      {
        value: 'List',
        icon: <EyeOutlined />,
      },
      {
        value: 'Kanban',
        icon: <EyeInvisibleOutlined />,
      },
    ]}
  />
          </Space>
        }
      >
        
        <Notifications />
        <hr style={{fontSize:'20px', margin:'50px'}}/>
      </Drawer>
    </>
     :
     <div>
       <DefaultLayout />,
     <Unauthorized />
     </div>
  );
}

export default AdminHome;
