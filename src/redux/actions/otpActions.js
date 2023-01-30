import { message } from "antd";
import axios from "../../API/axios";

export const requestOtp = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  const email = reqObj.email;
  localStorage.setItem(email, email);
  try {
    await axios.get(`/api/auth/requestotp?email=${email}`);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log("otp actions catch block", error);
    message.error("Otp request error");
  }
};

export const verifyOtp = (reqObj) => async (dispatch) => {
  const user = localStorage.getItem("user");
  dispatch({ type: "LOADING", payload: true });
  console.log("xxxxxx", user);
  function err_otp() {
    message.error("Invalid OTP");
  }
  function err_auth() {
    message.error("unauthorized entry");
  }
  try {
    await axios.post("/api/auth/varifyotp", { reqObj, user });
  dispatch({ type: "LOADING", payload: false });
    message.success("OTP successfully verified");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  } catch (error) {
      dispatch({ type: "LOADING", payload: false });
    if (error.response.status === 403) err_otp();
    if (error.response.status === 401) err_auth();
  }
};
