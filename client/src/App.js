import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import TestPage from './pages/TestPage';
import RegisterUser from './pages/RegisterUser';
import LoginUser from './pages/LoginUser';
import RecoverPassword from './pages/RecoverPassword';
import RecipeDetails from "./pages/RecipeDetails";
import FavRecipes from "./pages/FavRecipes";
import MyRecipes from "./pages/MyRecipes";
import AboutUs from './pages/AboutUs';

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
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



