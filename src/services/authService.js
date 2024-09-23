import api from './api';

const authService = {
  login: async (email, password) => {

    try {
   
    const response = await api.post('/users/login', { email, password });
   
    return response.data;
    }
    catch (err){
 
      console.error(err)
    }
  },
  signup: async (username, email, password) => {

    try {
    const response = await api.post('/users/signup', { username, email, password });
    console.log('response',response)
    return response.data;
    }
    catch (err){
      console.error(err)
    }
  },
};

export default authService;
