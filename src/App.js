import React from "react"
import './App.css';
import { BrowserRouter, Navigate, Outlet, Route,Routes } from 'react-router-dom'
import axios from "axios";

import {Home,Login,Register,BookingCar,Startup,UserBookings,AddCar,Profile,AdminHome,EditCar,Otp,Error404} from './pages/index' 
import Addcar from "./pages/admin/AddCar/AddCar";

function App() {
  // axios.defaults.baseURL="https://rentxcar.gamexonline.store";
  return (
    <div className="App">
    <BrowserRouter>  
      <Routes>
        
        <Route path='/' element={<Startup />}/>
        <Route path='/*' element={<Error404 />}/>
        <Route path='/settings' element={ <div>settings</div> } />
        <Route  path = '/home' element={<Home />}/>
        <Route  path = '/login' element={<Login />}/>
        <Route  path = '/Register' element={<Register />}/>
        <Route  path = '/Otp' element={<Otp />}/>
       

        <Route  path = '/booking/:id' element={  <ProtectedOutlet /> }>
          <Route path="" element={<BookingCar/>} />
        </Route>
        <Route  path = '/userbookings' element={  <ProtectedOutlet /> }>
          <Route path="" element={<UserBookings/>} />
        </Route>
        <Route  path = '/addcar' element={  <ProtectedOutlet /> }>
          <Route path="" element={<Addcar/>} />
        </Route>
        <Route  path = '/profile' element={  <ProtectedOutlet /> }>
          <Route path="" element={<Profile/>} />
        </Route>
        <Route  path = '/admin' element={  <AdminHome /> }>
          <Route path="" element={<Profile/>} />
        </Route>
        <Route  path = '/editcar/:id' element={  <EditCar /> }>
          <Route path="" element={<Profile/>} />
        </Route>
      </Routes>
      

    </BrowserRouter>

    </div>
  );
}

export default App;

export function ProtectedOutlet(props){
  const user = localStorage.getItem('user');
  return user ? <Outlet/> :  <Navigate to = '/login'/> 

} 