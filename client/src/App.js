import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import TestPage from './pages/TestPage';
import RegisterUser from './pages/RegisterUser';
import LoginUser from './pages/LoginUser';
import RecoverPassword from './pages/RecoverPassword';
import RecipeDetails from "./pages/RecipeDetails";
import FavRecipes from "./pages/FavRecipes";
import MyRecipes from "./pages/MyRecipes";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/login" element={<LoginUser />} /> 
                <Route path="/recipedetails" element={<RecipeDetails />} /> 
                <Route path="/favrecipes" element={<FavRecipes />} /> 
                <Route path="/myrecipes" element={<MyRecipes />} /> 
                <Route path="/RecoverPassword" element={<RecoverPassword />} /> 
            </Routes>
        </BrowserRouter>
    );
};

export default App;



