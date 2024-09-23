import axios from 'axios';



const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config)=>{
  const res = JSON.parse(localStorage.getItem('user'))
    console.log('middleware res',res)
 
    if (res && res.token) {
      config.headers.Authorization = `Bearer ${res.token}`;
    }
    return config;
},
  error => Promise.reject(error)
)
export default api;
