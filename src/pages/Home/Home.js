import React from "react";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  DatePicker,
  Select,
  Pagination 
} from "antd";
import { DefaultLayout } from "../../components/index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../redux/actions/carsActions";
import { Spinner } from "../../components/index";
import "./home.css";
import NavBar from "../../components/NavBar/NavBar";
import { Footnote } from "../../containers";
import {SearchOutlined }from '@ant-design/icons'
import moment from "moment";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const { RangePicker } = DatePicker;

// import classes from './home.module.css';
function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = localStorage.getItem("user");
  const [totalCars, setTotalCars] = useState([]);
  const [duplicateCars, setDuplicatecars] = useState([])
  const dispatch = useDispatch();
  
  const useAxios = useAxiosPrivate()

  useEffect(() => {
    const fetchData = async()=>{
      const {data} = await useAxios.get("/api/cars/getallcars");
      console.log("dataaaaaaaaaaaa",data)
      dispatch(getAllCars(data));
    }
    fetchData()
  }, []);

  useEffect(() => {
    setTotalCars(cars);
    setDuplicatecars(cars);
  }, [cars]);


  //booking time filter function=======
  function setFilter(values) {
    let selectedFrom = moment(values[0].$d, "MMM DD yyyy hh:mm");
    let selectedTo = moment(values[1].$d, "MMM DD yyyy hh:mm");

    let temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlotes.length === 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlotes) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(cars);
          }
        }
      }
    }
    setTotalCars(temp);
  }
  //search key
  const [searchkey, setSearchKey] = useState('');
  const [category,setCategory] =useState('all');
  //filter by type
  function filterByType(e){
    setCategory(e);
    if(e!=='all'){
      const tempCars = duplicateCars.filter(car=>car.category === e)
      setTotalCars(tempCars);
    }else{
      setTotalCars(duplicateCars);
    }
  }
  //filter by search
  function filterBySearch(){
    const tempCars = duplicateCars.filter(car=>car.name.toLowerCase().includes(searchkey.toLowerCase()))
   setTotalCars(tempCars)
  }


  return (
    <>
      {user ? <DefaultLayout /> : <NavBar />}
      <Row justify="center"  className="sub_header_row pt-4" style={{minHeight:'18vh'}}>
        <Col
          lg={10}
          sm={24}
          className="d-flex justify-content-center mt-1"
        >

          <div className='d-flex justify-content-start'>
            <div>
            <SearchOutlined /> Search<input type="text" className="search-bar no-outline bs2" 
            style={{width:'400px',height:'35px'}}
            onChange={(e) =>{setSearchKey(e.target.value)}} 
            value={searchkey}  
            onKeyUp={filterBySearch}
            />
            </div>
          </div>
        </Col>
        <Col
          style={{}}
          lg={14}
          sm={24}
          className="d-flex justify-content-center mt-1"
        >
            <div
            className=""
            style={{ }}
          >
            {/* <Cartypetab /> */}
            <Select
            className="no-outline bs1"
              onChange={(e)=>{filterByType(e)}}
              onKeyUp={filterByType}
              defaultValue={category}
              style={{
                width: 90, 
                border: "3px meshed gray",
                borderRadius: "20px",
              }}
              // onChange={handleChange}
              options={[
                {
                  value: "all",
                  label: "ALL",
                },
                {
                  value: "suv",
                  label: "SUV",
                },
                {
                  value: "sedan",
                  label: "Sedan",
                },
                {
                  value: "hatchback",
                  label: "Hatch",
                },
                {
                  value: "coupe",
                  label: "Coupe",
                },
                {
                  value: "muv",
                  label: "MUV",
                },
              ]}
            />
          </div>
          <div className="">
            <RangePicker
              className="rangepicker bs1"
              style={{ border: "", color: "black" }}
              showTime={{ format: "HH:mm" }}
              format="MMM DD YYYY HH:mm"
              onChange={setFilter}
            />
          </div>
        </Col>
      </Row>
      {loading === true && <Spinner />}
      <Row justify="center" className="pb-5" style={{minHeight:'90vh'}} >
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24} className="mx-3">
              <div className="cars p-2 bs1 mt-3">
                <img src={car.image} className="carimg" alt="carimage" />
                <div
                  className="car-content d-flex align-items-center justify-content-between"
                  id="push"
                >
                  <div>
                    <p className="car-txt">{car.name}</p>
                    <p className="rent-txt">
                      {" "}
                      Rent Per Hour ₹ {car.rentPerHour}/-
                    </p>
                  </div>
                  <div>
                    <button className="bn632-hover bn19">
                      <Link
                        style={{ color: "white" }}
                        to={`/booking/${car._id}`}
                      >
                        <span className="bookNow-txt">Book Now</span>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <div className="m-5">
      <Pagination  defaultCurrent={1} total={50} />
      </div>
      <div className="mt-5">
        <Footnote />
      </div>
    </>
  );
}

export default Home;
