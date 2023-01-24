import axios, { axiosPrivate } from "../API/axios"
import { useEffect,useState } from "react"
// import useAuth from "./useAuth";

const useAxiosPrivate = () =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log("request sent",config)
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${user.token}`;
                }
                return config;
            },(error) =>{
                Promise.reject(error)
            }   
        )
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response =>{
                console.log('response got');
                return response
            },
            async (error) => {
                console.log(error)
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.send) {
                    prevRequest.send = true;
                    // const newAccessToken = await refresh();
                    // console.log(newAccessToken)
                    // prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);

                }

                return Promise.reject(error)
            }
        )
        
    },[user])
    return axiosPrivate;
}
export default useAxiosPrivate