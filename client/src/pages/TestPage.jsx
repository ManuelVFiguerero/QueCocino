import React from 'react';
import RecipeCard from '../components/RecipeCard';

const TestPage = () => {
    const exampleRecipe = {
        image: '../assets/comida.webp', 
        title: 'Receta de Ejemplo',
        subtitle: 'Descripción breve de la receta.',
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-5">Test de RecipeCard</h1>
            <RecipeCard recipe={exampleRecipe} />
        </div>
    );
};

export default TestPage;
