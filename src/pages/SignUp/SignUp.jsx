import React, { useState } from 'react';
import Navbar from '../../component/Navbar/Navbar';
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from '../../component/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");
    console.log("Base URL:", process.env.REACT_APP_BASE_URL); // Debugging

    // Sign Up API call
    try {
      const payload = {
        UserAccount: name,
        Email: email,
        Password: password,
      };
      console.log("Sending payload:", payload);

      const response = await axiosInstance.post(`/api/account/signup`, payload);
      console.log("Response data:", response.data);

      // Handle successful sign up response
      // Assuming success is determined by a specific status in the response, e.g., a 200 status code
      if (response.status === 200) {
        navigate('/SignIn'); // Redirect to login page after successful sign up
      }
    } catch (error) {
      // Handle sign up error
      if (error.response) {
        console.error("Error response:", error.response);
        if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7'>Sign Up</h4>
            <input 
              type='text' 
              placeholder='Name' 
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type='text' 
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className='text-red-500 text-sx pb-1'>{error}</p>}
            <button type='submit' className='btn-primary'>Create Account</button>
            <p className='text-sm text-center mt-4'>
              Already have an account? {" "}
              <Link to="/SignIn" className='fonte-medium text-primary underline'>
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
