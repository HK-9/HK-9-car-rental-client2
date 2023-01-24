import React from 'react'
import useAxiosPrivate from './useAxiosPrivate'

function Requests() {
    useAxios = useAxiosPrivate()
    async function fetchCars (){
        return useAxios.get('/api/cars/getallcars');
    }
  return (
    fetchCars
  )
}

export default Requests
