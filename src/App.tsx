
import './App.css'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Nav from './components/home/Nav';
import Footer from './components/home/Footer';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PasswordUpdated from './pages/auth/PasswordUpdated';
import OtpVerification from './pages/auth/OtpVerification';
import AllOffers from './pages/AllOffers';
function App() {

  return (
    
      <Router>
         <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-updated" element={<PasswordUpdated />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/all-offers" element={<AllOffers/>} />





        </Routes>
        <Footer/>
      </Router>
    
  )
}

export default App
