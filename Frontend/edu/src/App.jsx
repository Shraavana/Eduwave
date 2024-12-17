import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usersideroutes from './Routes/Usersideroutes';
import Tutorsideroutes from './Routes/Tutorsideroutes';
import Adminsideroutes from './Routes/Adminsideroutes';
import './utils/axiosConfig';

const App = () => {
  
  return (
   
      <Router>
        <Routes>
          <Route path="/admin/*" element={<Adminsideroutes />} />
          <Route path="/tutor/*" element={<Tutorsideroutes />} />
          <Route path="/*" element={<Usersideroutes />} />
        </Routes>
      </Router>
   
  );
};

export default App;

