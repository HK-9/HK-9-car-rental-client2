import React, { useState } from "react";
import styled from "styled-components";
import Vector from "./Vector";
import OTPInput from "otp-input-react";
import { useDispatch,useSelector } from "react-redux";
import { verifyOtp } from "../../redux/actions/otpActions";
import "./otp.css";
import { message } from "antd";
import { useEffect } from "react";
import { LoadingOutlined} from '@ant-design/icons';
const StyledContainer = styled.div`
  height: 97vh;
  width: 100vw;
  background: #ffffff;
  margin: 0;
  padding: 0;
  display: flex;
  background: #ffffff;
`;

const StyledContainer2 = styled.div`
  position: absolute;
  flex-direction: column;
  width: ${(props) => props.inputWidth};
  height: ${(props) => props.inputHeight};
  top: 0px;
  right: 0px;
  background: #2b6350;

  border-top-right-radius: ${(props) => props.inputBorder || 0};
  border-bottom-right-radius: ${(props) => props.inputBorder || 0};
`;

const StyledContainer3 = styled.div`
  position: absolute;
  margin: 21px;
  width: 83vw;
  height: 75vh;
  background: #ffffff;
  box-shadow: 0px 4px 59px rgb(0 0 0 / 25%);
  border-radius: 17px;
`;
const StyledYo = styled.div`
  display: flex;
  justify-content: center;
  width: 104vw;
  height: 98vh;
  align-items: center;
`;

const StyledLogo = styled.div`
  position: absolute;
  width: 40vw;
  height: 50vh;
  margin-left: 11px;
  left: 40px;
  top: -57px;
  background: url(${(props) => props.inputImg}) no-repeat;
  background-size: contain;
`;
const StyledSubtitle = styled.div`
  position: absolute;
  width: 20vw;
  height: 20px;
  left: 140px;
  top: 137px;
  background: url(${(props) => props.inputImg}) no-repeat;
  background-size: contain;
  color: #00432c;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 19px;
`;

function Otp() {
  const { loading } = useSelector((state) => state.alertsReducer)
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState("");
  const [user, setUser] = useState(null)

    
    // console.log('user',OTP)
    const userEmail = user?.email;
    console.log("userEmail",userEmail)
    useEffect(()=>{
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData)
      if(!userData){
        message.error('Looks like your session expired, Please login again')
        setTimeout(()=>{
          window.location.href='/register'
        },[2000])
      }  
        
    console.log('hei')
  },[])

  function handleChange(otp) {
    setOTP(otp);
  }
  function handleClick(){
    dispatch(verifyOtp(OTP));
  }
  return (
    <StyledContainer>
      <StyledContainer2
        inputWidth="60vw"
        inputHeight="100vh"
      ></StyledContainer2>
      <StyledYo>
        <StyledContainer3>
          {/* <StyledLogo inputImg={Logo}></StyledLogo> */}
          <StyledSubtitle>RENT'X © </StyledSubtitle>
          <Vector />
          <StyledContainer2
            inputWidth="51.5vw"
            inputHeight="75vh"
            inputBorder="15px"
          >
            {/* <Verify /> */}
            <div className="verifyDiv">
              <p className="p1">Verify Account</p>
              <p className="p2">
                An OTP has been sent to your entered email{" "}
                <u>
                  <strong style={{ textTransform:'lowercase'}}> {userEmail}</strong>
                </u>
              </p>
              <div className="otpElements">
                <p className="p3">Enter your Code here</p>
                <div className="otp">
                  <OTPInput
                    value={OTP}
                    onChange={handleChange}
                    otpType="number"
                    inputStyle="inputStyle"
                    numInputs={4}
                    separator={<span></span>}
                    secure
                  />
                </div>

                <p className="p3">Didn't receive the code?</p>
                <p className="resend">Resend</p>
              </div>
              <button className="otp-btn" onClick={handleClick} type="submit">
                {loading? <LoadingOutlined /> :                 
                "Verify"}
              </button>
            </div>
          </StyledContainer2>
        </StyledContainer3>
      </StyledYo>
    </StyledContainer>
  );
}

export default Otp;
