import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import TestPage from './pages/TestPage';
import RegisterUser from './pages/RegisterUser';
import LoginUser from './pages/LoginUser';
import RecoverPassword from './pages/RecoverPassword';
import RecipeDetails from "./pages/RecipeDetails";

const App = () => {
    return (
        console.log("hola")
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/login" element={<LoginUser />} /> 
                <Route path="/recipedetails" element={<RecipeDetails />} /> 
                <Route path="/RecoverPassword" element={<RecoverPassword />} /> 
            </Routes>
        </BrowserRouter>
    );
};

export default App;



