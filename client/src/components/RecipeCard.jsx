import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { agregarAFavoritos, eliminarDeFavoritos } from '../api'; // Importa la función de eliminar de favoritos
import { useAuth } from '../components/AuthContext';

const RecipeCard = ({ recipe, isMyRecipes = false, isFavRecipes = false, onDelete }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { user } = useAuth(); // Obtener información de usuario
    const images = recipe.imagen && recipe.imagen.length > 0 ? recipe.imagen : ['ruta_de_imagen_por_defecto.png']; // Imagen de respaldo

    const changeImage = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    const handleGuardarClick = async () => {
        if (user && user._id) {
            try {
                await agregarAFavoritos(user._id, recipe._id); // Llama al método con el ID del usuario y la receta
                alert('Receta agregada a favoritos');
            } catch (error) {
                console.error('Error al agregar receta a favoritos:', error);
                alert('Hubo un error al guardar la receta');
            }
        } else {
            alert('Inicia sesión para guardar recetas en tus favoritos');
        }
    };

    const handleEliminarDeFavoritos = async () => {
        if (user && user._id) {
            try {
                await eliminarDeFavoritos(user._id, recipe._id); // Llama al método con el ID del usuario y la receta
                alert('Receta eliminada de favoritos');
                if (onDelete) onDelete(recipe._id); // Llama a onDelete para actualizar el estado en FavRecipes
            } catch (error) {
                console.error('Error al eliminar receta de favoritos:', error);
                alert('Hubo un error al eliminar la receta de favoritos');
            }
        } else {
            alert('Inicia sesión para gestionar tus favoritos');
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

            <h2 className="text-lg font-semibold text-center mt-2">{recipe.nombre}</h2>
            <p className="text-center mb-4 text-sm">{recipe.autor}</p>
            <p className="text-center mb-4 text-sm flex-grow">{recipe.descripcion}</p> 

            <div className="flex justify-end space-x-2 mt-auto">
                {isMyRecipes ? (
                    <>
                        <button 
                            onClick={() => console.log('Eliminar receta', recipe._id)} 
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
                            onClick={handleEliminarDeFavoritos} 
                            className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition duration-200"
                        >
                            Eliminar
                        </button>
                    ) : (
                        <button 
                            onClick={handleGuardarClick} 
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
