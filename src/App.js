import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/home/:id" element={<Home />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/home/:email" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
