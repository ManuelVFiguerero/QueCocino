// SearchGrid.js
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; // Asegúrate de tener este componente

const SearchGrid = ({ allRecetas }) => {
    const [visibleRecipes, setVisibleRecipes] = useState([]); // Estado para las recetas visibles
    const [recipesToShow, setRecipesToShow] = useState(15); // Estado para la cantidad de recetas a cargar

    useEffect(() => {
        // Al iniciar, carga las primeras 15 recetas o menos si no hay tantas
        const initialRecipes = allRecetas.slice(0, recipesToShow);
        setVisibleRecipes(initialRecipes);
    }, [recipesToShow, allRecetas]);

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
        <div className="flex flex-col p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {visibleRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default SearchGrid;
