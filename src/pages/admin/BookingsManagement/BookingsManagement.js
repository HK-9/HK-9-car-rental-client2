import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  cancelBooking,
} from "../../../redux/actions/bookingActions";
import {
  DeleteOutlined,
} from "@ant-design/icons";
import { Spinner, DefaultLayout } from "../../../components";
import { Row, Col, Popconfirm, Badge, Space, Card,Divider, Tag } from "antd";
import moment from "moment/moment";
import "../../../pages/UserBookings/userbookings.css";

function BookingsManagement() {
  const user = localStorage.getItem("user");
  console.log(user)
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);
  return (
    <div>
      {/* {loading === true && <Spinner />} */}
      {/* <NavBar/> */}
      <Space direction="vertical" style={{width:'100%',height:'100%',minHeight:"90vh"}} size='large'>
      <Row justify="center">
        <Col lg={20} sm={24}  style={{minHeight:'90vh'}}>
          {bookings.map((booking) => {
            return (
              <>
                  <Card className="mb-4 mt-4 bs1">
                  <Row 
                className="text-left flex align-items-center"
                style={{ borderRadius: "10px"}}
              >
                  <Col lg={7} sm={24}>               
                        
                          <p>
                            <b>{booking.car.name}</b>
                          </p>
                          <p>
                          </p>
                          <p>
                            Total Hours :<b>{booking.totalHours}</b>
                          </p>
                          <p>
                            Total Amount :<b>{booking.totalAmount}</b>
                          </p>
                          <p>
                            Rent Per Hour :<b>{booking.car.rentPerHour}</b>
                          </p>
                          <p>
                          Status : <b>{booking.status === "cancelled" ? <Tag color="red">{booking.status}</Tag>:<Tag color="green">{booking.status}</Tag>}</b>
                          </p>
                         

                          {/* <p>Total Amount :<b>{booking.totalAmount}</b></p> */}
                          
                  </Col>
                  <Col lg={10} sm={24}>
                    <p>
                      Transaction ID :<b>{booking.transactionId}</b>{" "}
                    </p>
                    {/* <p>From : <b>{booking.car.bookedTimeSotes.from}</b></p> */}

                    <p>
                      From : <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To : <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Data of booking :{" "}
                      <b>{moment(booking.createdAt).format("MM,DD,yyyy")}</b>
                    </p>
                  </Col>
                  <Col lg={7} sm={24}>
                    <div className="p-2 justify-content-center">
                      <img
                        src={booking.car.image}
                        height="140"
                        className="thumbnail-img p-2"
                        alt="loading.."
                      />
                      <div className="dflex justify-content-center" style={{}}>
          
                      </div>
                    </div>
                  </Col>
              </Row>
                  </Card>
              {!bookings && <p>No bookings yet.</p>}
                </>
            );
          })}
        </Col>
      </Row>
      <div style={{postition:'sticky'}}>
        
      </div>
      </Space>
    </div>
  );
}

export default BookingsManagement;