import React from "react";
import { Row, Col, Divider, DatePicker, Checkbox, Button, Modal } from "antd";
import {} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../redux/actions/carsActions";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { useEffect, useState } from "react";
import { Spinner, NavBar } from "../../components/index";
import StripeCheckout from "react-stripe-checkout";
import { Spin } from "antd";
import "./bookingcar.css";
import moment from "moment";
import { bookCar } from "../../redux/actions/bookingActions";
import { Footnote } from "../../containers";
const { RangePicker } = DatePicker;

function BookingCar({ match }) {
  const user = localStorage.getItem("user");
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  console.log("loading::", loading);
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      setCar(cars.find((o) => o._id === id));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    console.log(totalHours);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);
  //=================-F U N C T I O N S-=================
  
  //time slotes(datepicker)
  function selectTimeSlotes(values) {
    console.log();
      
    setFrom(moment(values[0].$d).format("MMM DD yyyy hh:mm"));
    setTo(moment(values[1].$d).format("MMM DD yyyy hh:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  //booknow button
  function bookNow() {

  }
  //See booke slotes MODAL
  function displayModal() {
    setShowModal(true);
  }
  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  //stripe payment gateway
  function onToken(token){
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.data.user._id;
    // const transactionId = 1234;
    const reqObj = {
      token, 
      user: userId,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj)); 
  }

  return (
    <div>
      {user ? <DefaultLayout /> : <NavBar />}
      {loading === true && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
        >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} className="carimg2 bs1" alt="carimage" />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider className="fw-bold" dashed>
            Car Info
          </Divider>

          <div style={{ textAlign: "right" }} className="fs-6">
            <p className="" style={{ textTransform: "capitalize" }}>
              {car.name}
            </p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>Max Persons: {car.capacity}</p>
            <Divider className="fw-bold" dashed>
              Select Time Slots
            </Divider>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="MMM DD YYYY hh:mm"
              onChange={selectTimeSlotes}
            />
            <br />
            <Button
              className="mt-2"
              style={{
                backgroundColor: "orange",
                color: "white",
                width: "25%",
              }}
              onClick={displayModal}
            >
              {" "}
              <b>See Booked Slotes</b>{" "}
            </Button>
            {from && to && (
              <div>
                <p>Total hours: {totalHours}</p>
                <p>Rent/hr: {car.rentPerHour}</p>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDriver(true);
                    } else {
                      setDriver(false);
                    }
                  }}
                >
                  {" "}
                  <p>driver required</p>{" "}
                </Checkbox>
                <h3> Total Amount : {totalAmount} </h3>

                <StripeCheckout
                  shippingAddress
                  
                  token={onToken}
                  amount={totalAmount * 100}
                  currency ='inr'
                  stripeKey="pk_test_51MAsKUSBVpln2MKoyKZjDGtbXllAE8aHqSN9i0SvTXVfoXxF82FduXR5ltAQUFCxv8gGKpgiU6XYrFTyL0CDEZIh003f0wRsXV"

                >
                  <Button
                    style={{
                      backgroundColor: "orange",
                      color: "white",
                      width: "40%",
                    }} //stripe payment module 
                  >
                    <b>Book Now</b> 
                  </Button>
                </StripeCheckout>
              </div>
            )}
          </div>
        </Col>
      </Row>
      {car.name && (
        <Modal
          title="See Booked Slots"
          open={showModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {car.name && (
            <div className="pt-2">
              {car.bookedTimeSlotes.map((slot) => {
                return (
                  <Button
                    className="mt-1 bs1"
                    style={{ border: "2px solid orange" }}
                  >
                    {slot.from} - {slot.to}{" "}
                  </Button>
                );
              })}
            </div>
          )}
        </Modal> //modal to see booked time slotes
      )}
      <Footnote />
    </div>
  );
}

export default BookingCar;
