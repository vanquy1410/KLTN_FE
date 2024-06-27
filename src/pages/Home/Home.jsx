import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../../component/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const navigate = useNavigate();
  const { email } = useParams();

  const getAccountInfo = useCallback(async () => {
    if (!email) {
      console.error("Email parameter is undefined");
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/account/getOneByEmail/${email}`);
      if (response.data && response.data.account) {
        setAccountInfo(response.data.account);
      }
    } catch (error) {
      console.error("Error fetching account info:", error);
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/SignIn");
      }
    }
  }, [email, navigate]);

  useEffect(() => {
    if (email !== undefined) {
      getAccountInfo();
    } else {
      console.log("Email is undefined, handling accordingly");
    }
  }, [email, getAccountInfo]);

  return (
    <>
      <Navbar accountInfo={accountInfo} />
    </>
  );
};

export default Home;
