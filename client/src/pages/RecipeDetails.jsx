import React from 'react';
import { useLocation } from 'react-router-dom';

const RecipeDetails = () => {
    const location = useLocation(); // Acceder a la ubicación actual
    const { recipe } = location.state || {}; // Extraer recipe del estado, o undefined si no está disponible

    // Manejo de errores
    if (!recipe) {
        return <p>No se encontró la receta.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200"> 
            <div className="border rounded-lg p-6 mb-4 mt-4 bg-white shadow-lg max-w-xl h-180">
                <div className="mt-2">
                    <h2 className="text-2xl font-semibold text-center mb-1">{recipe.tituloReceta}</h2>
                    <p className="text-center mb-4 text-lg">{recipe.autor}</p>
                </div>
                <img 
                    src={recipe.image} 
                    className="w-full h-58 object-cover rounded" 
                />
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-center">Ingredientes</h2>     
                    <ul className="list-disc list-inside text-lg text-left ml-4">
                        {recipe.ingredientes.map((ingrediente, index) => (
                            <li key={index}>{ingrediente}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-center">Instrucciones</h2>
                    <p className="text-center mb-4 text-lg">{recipe.instrucciones}</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-center">Restricciones/Alimentaciones</h2>
                    <ul className="list-disc list-inside text-lg text-left ml-4">
                        {recipe.restricciones.map((restriccion, index) => (
                            <li key={index}>{restriccion}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center mt-6">
                    <button className="bg-brown text-white text-sm px-4 py-2 rounded-full hover:bg-brown-700 transition duration-200">Guardar Receta</button>
                </div>
                <div className="flex justify-center mt-6">
                    <button className="bg-white text-brown text-xs px-5 py-2 rounded-full border border-brown hover:bg-brown-100 transition duration-200">Calificar Receta</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
