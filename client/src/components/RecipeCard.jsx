import React from 'react';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="border rounded p-4 mb-4 bg-white shadow">
            <h2 className="text-xl font-bold">{recipe.title}</h2>
            <p>{recipe.description}</p>
        </div>
    );
};

export default RecipeCard;
