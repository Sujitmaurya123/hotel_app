
import './App.css'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Nav from './components/home/Nav';
import Footer from './components/home/Footer';


import OtpVerification from './pages/auth/OtpVerification';
import AllOffers from './pages/AllOffers';
import SignIn from './pages/auth/SignIn';
import About from './pages/footerPage/About';
import ContactSection from './pages/footerPage/Contact';
import { Toaster } from 'react-hot-toast';
import Blogs from './pages/footerPage/Blogs';
import ReservationForm from './pages/booknow/Book';
import DiningReservation from './pages/booknow/Dininig';
import EventsReservation from './pages/booknow/EventsReservation';
import GalleryPage from './pages/footerPage/Gallery';
import BookingConfirmation from './pages/bookingconfirmation/BookingConfirmation';
import BookingDetails from './pages/booknow/BookingDetails';
import ProfileSettings from './pages/Profile/ProfileSettings';
import RestaurantMenuBookingPage from './pages/dining/Dining';
function App() {

  return (
    
      <Router>
      <Toaster position="top-right" reverseOrder={false} />
         <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
      
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/all-offers" element={<AllOffers/>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactSection />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/booknow" element={<ReservationForm />} />
        <Route path="/dining" element={<DiningReservation />} />
        <Route path="/dining-menu" element={<RestaurantMenuBookingPage />} />

        <Route path="/events" element={<EventsReservation />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/user-profile" element={<ProfileSettings />} />












        </Routes>
        <Footer/>
      </Router>
    
  )
}

export default App
