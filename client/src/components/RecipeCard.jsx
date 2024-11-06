import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, isMyRecipes = false, isFavRecipes = false }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = recipe.image;

    const changeImage = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <div className="border rounded-lg p-4 mb-4 bg-white shadow-lg w-80 flex flex-col relative">
            
            <div className="relative w-full h-48 overflow-hidden">
                <img 
                    src={images[currentImageIndex]} 
                    className="w-full h-full object-cover rounded" 
                    alt="Recipe"
                />

                <button 
                    onClick={() => changeImage('prev')} 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-75 px-2 py-1 rounded-full"
                >
                    ‹
                </button>
                <button 
                    onClick={() => changeImage('next')} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-75 px-2 py-1 rounded-full"
                >
                    ›
                </button>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <span 
                            key={index} 
                            className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-brown' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>

            <h2 className="text-lg font-semibold text-center mt-2">{recipe.tituloReceta}</h2>
            <p className="text-center mb-4 text-sm">{recipe.autor}</p>
            <p className="text-center mb-4 text-sm flex-grow">{recipe.descripcion}</p> 

            <div className="flex justify-end space-x-2 mt-auto">
                {isMyRecipes ? (
                    <>
                        <button 
                            onClick={() => console.log('Eliminar receta', recipe.id)} 
                            className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition duration-200"
                        >
                            Eliminar
                        </button>
                        <Link 
                            to="/editrecipe" 
                            state={{ recipe }} 
                            className="bg-white text-brown text-xs px-3 py-1 rounded-full border border-brown hover:bg-brown-100 transition duration-200"
                        >
                            Editar
                        </Link>
                    </>
                ) : (
                    isFavRecipes ? (
                        <button 
                            onClick={() => console.log('Eliminar de favoritos', recipe.id)} 
                            className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition duration-200"
                        >
                            Eliminar
                        </button>
                    ) : (
                        <button 
                            onClick={() => console.log('Guardar receta', recipe.id)} 
                            className="bg-white text-brown text-xs px-3 py-1 rounded-full border border-brown hover:bg-brown-100 transition duration-200"
                        >
                            Guardar
                        </button>
                    )
                )}

                <Link 
                    to="/recipedetails" 
                    state={{ recipe }} 
                    className="bg-brown text-white text-xs px-3 py-1 rounded-full hover:bg-brown-700 transition duration-200"
                >
                    Ver Más
                </Link> 
            </div>
        </div>
    );
};

export default RecipeCard;
