import React from 'react'
import classes from './carosel.module.css';
import banner from '../../assets/banner.jpg'


const Carosel = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  }

return (
  <>
  <img className={classes.Banner} src={banner} alt="banner" />
  </>
  );
}


export default Carosel
