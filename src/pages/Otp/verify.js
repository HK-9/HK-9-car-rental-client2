import OTPInput from "otp-input-react";
import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { verifyOtp } from "../../redux/actions/otpActions";

import "./otp.css";


function Verify() {
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState("");
  function handleChange(otp) {
    setOTP(otp);
  }
  function handleClick(){
    dispatch(verifyOtp(OTP));
  }
    console.log('otp ',OTP)
  return (
    <div className="verifyDiv">
      <p className="p1">Verify Account</p>
      <p className="p2">
        An OTP has been sent to your entered email abcd@gmail.com
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
          secure />
        </div>

        <p className="p3">Didn't receive the code?</p>
        <p className="resend">Resend</p>
      </div>
      <button className="otp-btn" onClick={handleClick} type="submit">Verify</button>
    </div>
  );
}

export default Verify;
