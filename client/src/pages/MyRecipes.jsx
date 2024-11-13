import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import logo from '../assets/logo.png';
import { useAuth } from '../components/AuthContext';
import { obtenerUsuario } from '../api';

const MyRecipes = () => {
    const { user } = useAuth();
    const [visibleRecipes, setVisibleRecipes] = useState([]); 
    const [recipesToShow, setRecipesToShow] = useState(15); 

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                if (user && user._id) {
                    const usuarioData = await obtenerUsuario(user._id);
                    console.log("Datos del usuario obtenidos:", usuarioData); 
    
                    setVisibleRecipes(usuarioData.recetasPropias.slice(0, recipesToShow)); 
                }
            } catch (error) {
                console.error("Error al obtener recetas del usuario:", error);
            }
        };
    
        fetchUserRecipes();
    }, [user, recipesToShow]);     

    const loadMoreRecipes = () => {
        setRecipesToShow((prev) => prev + 15); 
    };

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

    const handleDeleteRecipe = (recipeId) => {
        setVisibleRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe._id !== recipeId));
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200">
            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown-600 mb-4">Mis Recetas</h1>

            {/* Sección de Recetas */}
            <div className="mt-2 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {visibleRecipes.map((recipe, index) => (
                        <RecipeCard 
                            key={index} 
                            recipe={recipe} 
                            isMyRecipes={true} 
                            onDelete={handleDeleteRecipe} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyRecipes;
