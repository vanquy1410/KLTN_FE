import React, { useState } from 'react';
import Navbar from '../../component/Navbar/Navbar';
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from '../../component/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignIn = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateEmail(Email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!Password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    console.log("Base URL:", process.env.REACT_APP_BASE_URL); // Debugging

    // Sign In API call
    try {
      const response = await axiosInstance.post(`/api/account/signin`, {
        Email: Email,
        Password: Password,
      });
      console.log("data", response.data);

      // Handle successful login response
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("Email", Email); // Store email in localStorage
        navigate(`/home/${Email}`); // Navigate to Home with email
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignIn}>
            <h4 className='text-2xl mb-7'>Sign In</h4>
            <input 
              type='text' 
              placeholder='Email' 
              className='input-box'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className='text-red-500 text-sx pb-1'>{error}</p>}
            <button type='submit' className='btn-primary'>Sign In</button>
            <p className='text-sm text-center mt-4'>
              Not registered yet? {" "}
              <Link to="/SignUp" className='fonte-medium text-primary underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
