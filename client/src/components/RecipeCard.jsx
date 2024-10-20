import React from 'react';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="border rounded-lg p-4 mb-4 bg-white shadow-lg w-80"> {/* Cambiar el ancho aquí */}
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded" /> {/* Ajusta la altura de la imagen */}
            <h2 className="text-lg font-semibold text-center mt-2">{recipe.title}</h2> {/* Cambiar a un texto más fino */}
            <p className="text-center mb-4 text-sm">{recipe.subtitle}</p> {/* Cambiar el tamaño de la fuente */}
            <div className="flex justify-between">
                <button className="bg-white text-brown text-xs px-3 py-1 rounded-full border border-brown hover:bg-brown-100 transition duration-200">Guardar</button> {/* Botón de Guardar */}
                <button className="bg-brown text-white text-xs px-3 py-1 rounded-full hover:bg-brown-700 transition duration-200">Ver Más</button> {/* Botón de Ver Más */}
            </div>
        </div>
    );
};

export default RecipeCard;




