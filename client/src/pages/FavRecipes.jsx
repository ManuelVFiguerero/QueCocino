import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import logo from '../assets/logo.png';
import { useAuth } from '../components/AuthContext';
import { obtenerRecetasFavoritas } from '../api';

const FavRecipes = () => {
    const { user } = useAuth();
    const [favoriteRecipes, setFavoriteRecipes] = useState([]); // Estado para las recetas favoritas
    const [recipesToShow, setRecipesToShow] = useState(15); // Estado para la cantidad de recetas a cargar

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            try {
                // Verifica que el usuario esté en sesión y obtén sus recetas favoritas
                if (user && user._id) {
                    const recetasFavoritas = await obtenerRecetasFavoritas(user._id);
                    // Mostrar solo las primeras `recipesToShow` recetas al cargar la página
                    setFavoriteRecipes(recetasFavoritas.slice(0, recipesToShow));
                }
            } catch (error) {
                console.error("Error al obtener recetas favoritas del usuario:", error);
            }
        };

        fetchFavoriteRecipes();
    }, [user, recipesToShow]);

    // Función para cargar más recetas al llegar al final de la página
    const loadMoreRecipes = () => {
        setRecipesToShow((prev) => prev + 15); // Aumenta el número de recetas mostradas en 15
    };

    // Detectar el scroll al fondo de la página
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadMoreRecipes();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200">
            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown-600 mb-4">Recetas Favoritas</h1>

            <div className="mt-2 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {favoriteRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} isFavRecipes={true} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavRecipes;
