import axios from 'axios';

const loginUser = async (email, password) => {
  try {
    const userData = {
      email: email,
      password: password
    };

    const response = await axios.post('https://quizapp-backend-yctp.onrender.com/user/login', userData);

    // Save token to local storage
    localStorage.setItem('token', response.data.token);
    console.log(response.data.token);
    // Optionally, you can also return the token
    return response.data.token;
  } catch (error) {
    console.error('Error logging in:', error);
    // Optionally, you can handle errors here
    return null;
  }
};

export default loginUser;
