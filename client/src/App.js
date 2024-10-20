import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import TestPage from './pages/TestPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;



