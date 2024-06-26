import React, { useState } from 'react';
import Navbar from '../../component/Navbar/Navbar';
import PasswordInput from '../../component/Input/PasswordInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

const SignUp = () => {

  const [name, setName] = useState("")
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
      e.preventDefault();

      if(!name){
        setError("Please enter your name");
        return;
      }

      if (!validateEmail(Email)) {
        setError("Please enter a valid email address.");
        return;
      }
  
      if(!Password){
        setError("Please enter the password.");
        return;
      }
  
      setError('')
      //Sign up API Call
  };
  return (
    <>
    <Navbar />

    <div className='flex items-center justify-center mt-28'> 
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7'>Sign Up</h4>

            <input
              type ="text"
              placeholder="Name"
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type ="text"
              placeholder="Email"
              className='input-box'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput 
            value= {Password}
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