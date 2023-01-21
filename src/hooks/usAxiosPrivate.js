import { axiosPrivate } from "../api/axios";
// import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import useAuth from "./useAuth";
const useAxiosPrivate = () => {
    
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log('request sent', config)
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user.token}`;
                }

                return config
            }, (error) => {
                Promise.reject(error)
            }
        )
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => {
                console.log('response got')
                return response
            },
            async (error) => {
                console.log(error)
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.send) {
                    prevRequest.send = true;
                    // prevRequest.headers['Authorization'] = `Bearer ${user.token}`;
                    return axiosPrivate(prevRequest);

                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
        }
    }, [user])
    return axiosPrivate;
}

export default useAxiosPrivate