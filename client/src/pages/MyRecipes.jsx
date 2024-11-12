import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import logo from '../assets/logo.png';
import { useAuth } from '../components/AuthContext';
import { buscarRecetas } from '../api';

const MyRecipes = () => {
    const { user } = useAuth();
    const [visibleRecipes, setVisibleRecipes] = useState([]); // Estado para las recetas visibles
    const [recipesToShow, setRecipesToShow] = useState(15); // Estado para la cantidad de recetas a cargar

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                // Verifica que el usuario esté en sesión y obtén sus recetas
                if (user && user._id) {
                    const recetas = await buscarRecetas([], [], user._id);
                    // Mostrar solo las primeras `recipesToShow` recetas al cargar la página
                    setVisibleRecipes(recetas.slice(0, recipesToShow));
                }
            } catch (error) {
                console.error("Error al obtener recetas del usuario:", error);
            }
        };

        fetchUserRecipes();
    }, [user, recipesToShow]);

    // Función para cargar más recetas
    const loadMoreRecipes = () => {
        setRecipesToShow((prev) => prev + 15); // Aumenta el número de recetas mostradas en 15
    };

    // Detectar el scroll al fondo de la página
    useEffect(() => {
        const handleScroll = () => {
            // Verificar si el usuario ha llegado al fondo de la página
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadMoreRecipes(); // Cargar más recetas cuando llega al final del scroll
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup del event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200">
            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown-600 mb-4">Mis Recetas</h1>

            {/* Sección de Recetas */}
            <div className="mt-2 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {visibleRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} isMyRecipes={true} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyRecipes;
