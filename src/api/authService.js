import axios from 'axios';
const API_URL = 'https://connections-api.herokuapp.com/users';

class AuthService {
  registerUser = async newUser => {
    console.log(newUser);
    const response = await axios.post(`${API_URL}/signup`, newUser);
    return response.data;
  };

  loginUser = async user => {
    const response = await axios.post(`${API_URL}/login`, user);
    return response.data;
  };
  logOutUser = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  };

  refreshUser = async () => {
    const response = await axios.get(`${API_URL}/current`);
    return response.data;
  };
}

const authService = new AuthService();
export { authService };
