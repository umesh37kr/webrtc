import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    withCredentials: true,
    headers:{
        'content-type':'application/json',
        Accept: 'application/json'
    }
    //http://localhost:5500/api/send-otp
})

// list of all the list point
export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data)
export const activate = (data) => api.post('api/activate', data)
export const logout = () => api.post('/api/logout')
export const createRoom = (data) => api.post('/api/rooms', data)
export const getAllRooms = () => api.get('/api/rooms')

//interceptors
api.interceptors.response.use(
    (config) =>{
        return config;
    },
    async (error) =>{
        const originalRequest = error.config;
        if(error.response.status === 401 && originalRequest && !originalRequest._isRetry){
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `${process.env.REACT_APP_URL_API}/api/refresh`,
                    {
                        withCredentials: true,
                    }
                )
                return api.request(originalRequest)
            } catch (error) {
                console.log(error.message)
            }
        }
        throw error
    }
)
export default api;