import React from 'react'
import {Spin} from 'antd'
import './spinner.css';

const Spinner = () => {
  return (
    <div className='spinner'>
      <Spin tip='Just a sec..' size='large' />
      <div className="content" />
    </div>
  )
}

export default Spinner
