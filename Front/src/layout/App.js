import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import Characteristics from './Characteristics/Characteristics';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import MyProfile from './MyProfile/MyProfile';
import Search from './Search/Search';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCharContext } from '../hooks/useCharContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const { user } = useAuthContext();
  const { characteristics } = useCharContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && characteristics === null) {
      window.location.replace('/characteristics');
    }
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        {user && characteristics === null ? (
          <>
            <Route path="*" element={<Navigate to="/characteristics" />} />
            <Route path="/characteristics" element={<Characteristics />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />

            <Route
              path="/characteristics"
              element={user ? <Characteristics /> : <Navigate to="/login" />}
            />

            <Route
              path="/search"
              element={user ? <Search /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/Register"
              element={user ? <Navigate to="/" /> : <Register />}
            />

            <Route
              path="/UserProfile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />

            <Route
              path="/myProfile"
              element={user ? <MyProfile /> : <Navigate to="/login" />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
