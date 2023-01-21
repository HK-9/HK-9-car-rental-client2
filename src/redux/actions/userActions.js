import axios from "axios";
import { message } from "antd";

// axios.defaults.baseURL="https://rentx-api-e9zj.onrender.com"
// import useAxiosPrivate from "../../hooks/usAxiosPrivate";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/auth/login", reqObj).then((res) => {
        console.log("successfull", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        message.success("Login Success");
        dispatch({ type: "LOADING", payload: false });
        setTimeout(() => {
          window.location.href = "/home";
        }, 500);
      })
      .catch((e) => {
        console.log("unsuccesfull", e);
        dispatch({ type: "LOADING", payload: false });
        message.error("Something went wrong");
      });
  } catch (error) {
    console.log("catch block", error);
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  
  dispatch({ type: "LOADING", payload: true });
  const email = reqObj.email;
  console.log('email:email')
  function err_userExists(){
    message.error('email already exists, please try another');
  }
  try {
    await axios.post("/api/auth/register", reqObj).then((res)=>{
      localStorage.setItem("user", JSON.stringify(res.data));
      const response = axios.get(`/api/auth/requestotp?email=${email}`);

      console.log('API otp response:',response.data);
    })
    message.success("An OTP has been sent to your entered email");
    setTimeout(() => {
      window.location.href = "/otp";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log("user Register catch block", error);
    dispatch({ type: "LOADING", payload: false });
    if(error.response.status === 401){
      err_userExists()
    }else{
      message.error("Something went wrong,please try again");
    }
  }
};
