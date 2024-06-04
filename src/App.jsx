import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import nprogress from 'nprogress'; // Import nprogress
import 'nprogress/nprogress.css'; // Import nprogress CSS

import LoginPages from './pages/LoginPages';
import RegisterPages from './pages/RegisterPages';
import ProfilePages from './pages/Profile/ProfilePages';
import CreateProfileAbout from './pages/Profile/CreateProfileAbout';
import UpdateProfileAbout from './pages/Profile/UpdateProfileAbout';
import CreateProfileInterest from './pages/Profile/CreateProfileInterest';
import { useAuth } from './context/auth';

function Layout() {
  const [auth] = useAuth();
  const location = useLocation();

  return auth?.access_token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const handleStart = () => {
      nprogress.start();
      setLoading(true);
    };

    const handleStop = () => {
      nprogress.done();
      setLoading(false);
    };

    handleStart();

    const timer = setTimeout(() => {
      handleStop();
    }, 500);

    return () => {
      clearTimeout(timer);
      handleStop();
    };
  }, [location]);

  return (
    <>
      {loading && <div className="loading-spinner"></div>}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/profile" element={<ProfilePages />} />
          <Route path="/create-profile-about" element={<CreateProfileAbout />} />
          <Route path="/update-profile-about" element={<UpdateProfileAbout />} />
          <Route path="/create-profile-interest" element={<CreateProfileInterest />} />
        </Route>

        <Route path="/" element={<LoginPages />} />
        <Route path="/register" element={<RegisterPages />} />
      </Routes>
    </>
  );
}

export default App;
