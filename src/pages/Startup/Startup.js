import React from 'react';
import {Link} from 'react-router-dom';
import './startup.css';
import{DefaultLayout,NavBar} from '../../components/index'; //navbar(no-user)
import {banner,map,car,timer,} from '../../assets/index';
import {Card,Row,Col,Layout} from 'antd';
import {Footnote} from '../../containers/index';

// import { Footer } from 'antd/es/layout/layout';
function Startup(){
  const user = JSON.parse(localStorage.getItem('user'));
    return(<>
           {user ? <DefaultLayout />: <NavBar />}
      <section className='cont'>
        <div className='carosel'>
            <img style={{width:'100%'}} src={banner} alt="" />
        </div>
        <div className='car-slogan'>
            <span className='car-slogan'>A complete car rental service.</span>
        </div>
        <div className='navigator-cards mb-5'>
            <Row justify='center'> 
            
                <Col className='mx-3 bs1'>

                    <div className='Card p-0 m-0'
                    style={{
                        width: 300,
                        height: 186
                    }}
                    >

                    <img className='car' src={map} alt="" />
                    <p className='card-txt'>FIND STATION</p>
                    
                    </div>
                </Col>
            
            
                <Col className='mx-3 bs1'>
                    <a href="/home">
                    <div className='card p-0 m-0'
                    style={{
                        width: 300,
                        height: 186
                    }}
                    >

                    <img className='car' src={car} alt="" />
                    <p className='card-txt'>FIND A CAR</p>
                    
                    </div>

                    </a>
                </Col>
                <Col className='mx-3 bs1'>
                    <div className='card p-0 m-0'
                    style={{
                        width: 300,
                        height: 186
                    }}
                    >

                    <img className='car' src={timer} alt="" />
                    <p className='card-txt'>BEST DEALS</p>
                    
                    </div>
                </Col>
            </Row>

        </div>
         <Footnote/>
      </section>
        </>
    )
}

export default Startup;
 