import axios from 'axios';

const registerUser = async (formData) => {
    console.log(formData);
    const userData ={
      username:formData.name,
    email:formData.email,
    password:formData.password
    }
  try {

    const response = await axios.post('https://quizapp-backend-yctp.onrender.com/user/register', userData);

    // Save token to local storage
    console.log(response.data);
    // Optionally, you can also return the user data and token
    return {
      user: response.data.user,
      token: response.data.token
    };
  } catch (error) {
    console.error('Error registering user:', error);
    // Optionally, you can handle errors here
    return null;
  }
};

export default registerUser;
