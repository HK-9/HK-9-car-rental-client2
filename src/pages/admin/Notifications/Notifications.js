import React from 'react'
import axios from 'axios';
import{Card,Col, Row} from 'antd'
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getAllNotifications } from '../../../redux/actions/notificationActions';
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';
import moment from "moment";
import './notifications.css';

  function Notifications() {
    const [notifi,setnotifi] = useState([]);
    const dispatch = useDispatch();
    const  {notifications}  = useSelector((state)=>state.notificationsReducer)

    useEffect(() => {  
        dispatch(getAllNotifications())
        // setnotifi(notifications)  
      }, []);

      return (
        <div>
      <Row justify='center'>
        <Col>        
          {notifications?.notifications?.notifications.map((e)=>{
            return(
              <>
                <Card className='mb-2 bs1'>
                    <Col className='p-0'>
                      <p  style={{color:'gray'}}>{e.text}</p>
                    <div className='d-flex flex-row-reverse m-0 p-0'>
                      <p className='mark-read p-0 m-0'>Mark as read</p>
                      <p className='time '>{(moment(e.time).format('hh:mm'))}</p>
                    </div>
                    </Col>
                </Card>
              
              </>
            )     
          })}
        </Col>
      </Row>
    </div>
  )
}

export default Notifications
