import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import TestPage from './pages/TestPage';
import RegisterUser from './pages/RegisterUser';
import LoginUser from './pages/LoginUser';
import RecoverPassword from './pages/RecoverPassword';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/login" element={<LoginUser />} /> 
                <Route path="/RecoverPassword" element={<RecoverPassword />} /> 
            </Routes>
        </BrowserRouter>
    );
};

export default App;



