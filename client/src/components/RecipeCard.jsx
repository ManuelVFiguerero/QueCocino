import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { agregarAFavoritos, eliminarDeFavoritos, eliminarReceta } from '../api';
import { useAuth } from '../components/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ recipe, isMyRecipes = false, isFavRecipes = false, onDelete }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { user } = useAuth();
    const images = recipe.imagen && recipe.imagen.length > 0 ? recipe.imagen : ['ruta_de_imagen_por_defecto.png'];

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
                await agregarAFavoritos(user._id, recipe._id);
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
                await eliminarDeFavoritos(user._id, recipe._id);
                alert('Receta eliminada de favoritos');
                if (onDelete) onDelete(recipe._id); // Actualiza el estado en FavRecipes
            } catch (error) {
                console.error('Error al eliminar receta de favoritos:', error);
                alert('Hubo un error al eliminar la receta de favoritos');
            }
        } else {
            alert('Inicia sesión para gestionar tus favoritos');
        }
    };

    const handleEliminarReceta = async () => {
        if (user && user._id) {
            try {
                await eliminarReceta(recipe._id);
                alert('Receta eliminada correctamente');
                if (onDelete) onDelete(recipe._id); // Actualiza el estado en MyRecipes
            } catch (error) {
                console.error('Error al eliminar receta:', error);
                alert('Hubo un error al eliminar la receta');
            }
        } else {
            alert('Inicia sesión para gestionar tus recetas');
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

            {/* Calificación de la receta */}
            <div className="absolute bottom-4 left-4 text-yellow-500 text-sm flex items-center">
                {recipe.promedioCalificacion && recipe.promedioCalificacion > 0 ? (
                    <>
                        {recipe.promedioCalificacion.toFixed(1)} <FontAwesomeIcon icon={faStar} className="ml-1" />
                    </>
                ) : (
                    <span>S/N</span>  // Si no hay calificación, muestra "S/N"
                )}
            </div>

            <div className="flex justify-end space-x-2 mt-auto">
                {isMyRecipes ? (
                    <>
                        <button 
                            onClick={handleEliminarReceta} 
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
                    to={isFavRecipes ? "/recipedetailsfav" : "/recipedetails"} 
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

