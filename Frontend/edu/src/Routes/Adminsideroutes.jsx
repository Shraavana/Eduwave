// src/Routes/Adminsideroutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../Pages/Adminside/Signin';
import AdminHome from '../Pages/Adminside/Adminhome';
// import Profile from '../Pages/Adminside/Profile';
import TutorsList from '../Pages/Adminside/Tutorslist';
import UsersList from '../Pages/Adminside/Userslist';

const Adminsideroutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/home" element={<AdminHome />} />
      <Route path="/users-list" element={<UsersList/>} />
      <Route path="/tutors-list" element={<TutorsList/>} /> 
     
/    </Routes>
  );
};

export default Adminsideroutes;
