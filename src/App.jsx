import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import nprogress from 'nprogress'; // Import nprogress
import 'nprogress/nprogress.css'; // Import nprogress CSS

import LoginPages from './pages/LoginPages';
import RegisterPages from './pages/RegisterPages';
import ProfilePages from './pages/Profile/ProfilePages';
import CreateProfileAbout from './pages/Profile/CreateProfileAbout';
import UpdateProfileAbout from './pages/Profile/UpdateProfileAbout';
import CreateProfileInterest from './pages/Profile/CreateProfileInterest';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      nprogress.start();
      setLoading(true);
    };

    const handleStop = () => {
      nprogress.done();
      setLoading(false);
    };

    // Start loading when location changes
    handleStart();

    // Stop loading after a delay to simulate page load
    const timer = setTimeout(() => {
      handleStop();
    }, 500); // Adjust the delay as needed

    // Cleanup function to stop loading
    return () => {
      clearTimeout(timer);
      handleStop();
    };
  }, [location]);

  return (
    <>
      {loading && <div className="loading-spinner"></div>}
      <Routes>
        <Route path="/" element={<LoginPages />} />
        <Route path="/register" element={<RegisterPages />} />
        <Route path="/profile" element={<ProfilePages />} />
        <Route path="/create-profile-about" element={<CreateProfileAbout />} />
        <Route path="/update-profile-about" element={<UpdateProfileAbout />} />
        <Route path="/create-profile-interest" element={<CreateProfileInterest />} />
      </Routes>
    </>
  );
}

export default App;
