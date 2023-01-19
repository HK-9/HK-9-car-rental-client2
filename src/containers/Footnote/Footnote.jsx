import React from 'react'
import './footer.css'
import { LinkedinOutlined, InstagramOutlined   } from '@ant-design/icons';
import {Layout,Row,Col,Tooltip} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const Footnote = () => {
  return (
   
    <Layout className='mt-5'>
    <Footer
    style={{
      textAlign: 'center',
      backgroundColor:'#232323',
      color:'white'
    }}
  >
    <div className='container mb-0 '>
      <Row>
        <Col lg={8} sm={24}>
          <img src="https://www.zoomcar.com/build/6b51f1464b17dbb1d002f16e26572662.png" alt="" className='footer-slogan' />
        </Col>
        <Col lg={3} sm={24}>
        </Col>
        <Col lg={13} sm={24} className='text-right'>
          <img src="https://static1.topspeedimages.com/wordpress/wp-content/uploads/2022/10/ford.png" alt="" className='footer-slogan' />
          <img src="https://static1.topspeedimages.com/wordpress/wp-content/uploads/2022/10/mercedes.png" alt="" className='footer-slogan' />
          <img src="https://static1.topspeedimages.com/wordpress/wp-content/uploads/2022/10/honda.png" alt="" className='footer-slogan' />
        </Col>
        
        <Col  lg={24} sm={24} className='align' style={{color:'#505050'}}>
           Rentx Design ©2022 created by @_hari666
           <a href="https://www.linkedin.com/in/harikrishna-pv-7478b9236/" target="_blank">
           <Tooltip placement='top' title='LinkedIn'>
             <LinkedinOutlined style={{color:' #0a66c2'} }/>
           </Tooltip>
           </a>
           <a href="">
           <InstagramOutlined />
           </a>
        </Col>
      </Row>
    </div>
  </Footer>
    </Layout>
  )
}

export default Footnote;
