import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../../redux/actions/carsActions";
import { deleteCar } from "../../../redux/actions/carsActions";

function CarsManagement() {
  const { cars } = useSelector((state) => state.carsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  const onChange = (key) => {
    console.log(key);
  };
return(
<>
<Row justify="center" className="">

  <Col lg={24}> 

<div className="d-flex justify-content-end" style={{width:'95%'}}>
            <a href="/addcar">
              <button className="button-2">
                <PlusCircleOutlined /> ADD CAR{" "}
              </button>
            </a>
          </div>
  </Col>
{totalCars.map((car) => {
  return (
    
    <Col lg={5} sm={24} xs={24} className="mx-3">
      
      <div className="cars p-2 bs1 mt-3">
        <img src={car.image} className="carimg" alt="carimage" />
        <div
          className="car-content d-flex align-items-center justify-content-between"
          id="push"
        >
          <div className="text-left pl-2">
            <p className="car-txt">{car.name}</p>
            <p className="rent-txt">
              Rent Per Hour {car.rentPerHour}/-
            </p>
          </div>
          <div className="actions">
            <Link to={`/editcar/${car._id}`}>
              <EditOutlined
                className="mx-3"
                style={{ cursor: "pointer", fontSize: "1.3rem" }}
              />
            </Link>
            <Popconfirm
              placement="bottomRight"
              title="Are you want to delete the car ?"
              onConfirm={()=>{
                console.log('working')
                dispatch(deleteCar({carid:car._id })); 
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                style={{
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  color: "red",
                }}
              />
            </Popconfirm>
          </div>
        </div>
      </div>
    </Col>
  );
})}
</Row>
</>

)

}
export default CarsManagement
