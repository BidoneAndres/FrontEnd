import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/login/json'; 

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username: username,
      password: password
    }, {
      responseType: 'text' 
    });

    if (response.data) {
      localStorage.setItem('user_token', response.data);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};