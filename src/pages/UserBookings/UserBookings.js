import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  cancelBooking,
} from "../../redux/actions/bookingActions";
import {
  DeleteOutlined,
} from "@ant-design/icons";
import { Spinner, DefaultLayout } from "../../components";
import { Row, Col, Popconfirm, Badge, Space, Card,Divider, Tag, Empty } from "antd";
import { Footnote } from "../../containers";
import moment from "moment/moment";
import "./userbookings.css";


function UserBookings() {
  const user = localStorage.getItem("user");
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  console.log("bookings", bookings);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <div>
      {loading === true && <Spinner />}
      <DefaultLayout />
      {/* <NavBar/> */}
      <h3 className="text-center mt-2">MY BOOKINGS</h3>
      <Space direction="vertical" style={{width:'100%',height:'100%',minHeight:"90vh"}} size='large'>
      <Row justify="center">
        <Col lg={20} sm={24}  style={{minHeight:'90vh'}}>
          {bookings.length === 0 && (<div className="d-flex justify-content-center" style={{width:'100%',hieght:'auto'}}>
            <Empty />
            </div>)}
          {bookings.map((booking) => {
            return (
              <>
               <Badge.Ribbon text="Special Offer"  color="red">
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
                        
                          
                  </Col>
                  <Col lg={10} sm={24}>
                    <p>
                      Transaction ID :<b>{booking.transactionId}</b>{" "}
                    </p>

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
                      {booking.status !== "cancelled" ? (
                              <Popconfirm
                                placement="bottomLeft"
                                title="Do you want to cancel the booking ?"
                                onConfirm={() => {
                                  dispatch(
                                    cancelBooking(booking._id, booking.car._id)
                                  );
                                }}
                                okText="Yes"
                                cancelText="No"
                              >
                                <button  className="button-2" onClick={() => {}}>
                                  Cancel Booking
                                </button>
                              </Popconfirm>
                            ):
                            <Popconfirm 
                            placement="bottomLeft"
                            title="Do you want to cancel the booking ?"
                            onConfirm={() => {
                              dispatch(
                                cancelBooking(booking._id, booking.car._id)
                              );
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined className="delete-btn"
                        style={{
                          cursor: "pointer",
                          fontSize: "1.3rem",
                          color: "red",
                        }}
                      />
                          </Popconfirm>}
                      </div>
                    </div>
                  </Col>
              </Row>
                  </Card>

                </Badge.Ribbon>
              {!bookings && <p>No bookings yet.</p>}
                </>
            );
          })}
        </Col>
      </Row>
      <div style={{postition:'sticky'}}>
        
      <Footnote />
      </div>
      </Space>
    </div>
  );
}

export default UserBookings;
