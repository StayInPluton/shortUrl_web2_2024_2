import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ShortenUrl from './pages/ShortenUrl';
import UserAccount from './pages/UserAccount';
import AccessDetails from './pages/AccessDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/access/:urlId" element={<AccessDetails />} />
        <Route path="/" element={<ShortenUrl />} />
      </Routes>
    </Router>
  );
}

export default App;