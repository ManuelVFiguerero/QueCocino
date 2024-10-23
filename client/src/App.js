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
import EditRecipe from './pages/EditRecipe';
import CreateRecipe from './pages/CreateRecipe';
import { AuthProvider } from './components/AuthContext';  // Importamos el AuthProvider
import PrivateRoute from './components/PrivateRoute';  // Usamos la ruta privada

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/register" element={<RegisterUser />} />
                    <Route path="/login" element={<LoginUser />} /> 
                    <Route path="/RecoverPassword" element={<RecoverPassword />} />

                    {/* Rutas protegidas */}
                    <Route path="/recipedetails" element={<PrivateRoute><RecipeDetails /></PrivateRoute>} /> 
                    <Route path="/favrecipes" element={<PrivateRoute><FavRecipes /></PrivateRoute>} /> 
                    <Route path="/myrecipes" element={<PrivateRoute><MyRecipes /></PrivateRoute>} />
                    <Route path="/createrecipe" element={<PrivateRoute><CreateRecipe /></PrivateRoute>} />
                    <Route path="/editrecipe" element={<PrivateRoute><EditRecipe /></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
