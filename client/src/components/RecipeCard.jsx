import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { agregarAFavoritos, eliminarDeFavoritos, eliminarReceta } from '../api';
import { useAuth } from '../components/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaLeaf, FaBreadSlice, FaTint, FaCarrot, FaFireAlt } from 'react-icons/fa';

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
                if (onDelete) onDelete(recipe._id);
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
                if (onDelete) onDelete(recipe._id);
            } catch (error) {
                console.error('Error al eliminar receta:', error);
                alert('Hubo un error al eliminar la receta');
            }
        } else {
            alert('Inicia sesión para gestionar tus recetas');
        }
    };

    const getRestrictionStyle = (restriccion) => {
        switch (restriccion.toLowerCase()) {
            case 'sin tacc':
                return { icon: <FaBreadSlice className="inline-block mr-1" />, bgColor: 'bg-red-100', textColor: 'text-red-600'};
            case 'sin lactosa':
                return { icon: <FaTint className="inline-block mr-1" />, bgColor: 'bg-blue-100', textColor: 'text-blue-600'};
            case 'apto vegano':
                return { icon: <FaLeaf className="inline-block mr-1" />, bgColor: 'bg-green-100', textColor: 'text-green-600' };
            case 'apto vegetariano':
                return { icon: <FaCarrot className="inline-block mr-1" />, bgColor: 'bg-green-100', textColor: 'text-green-700' };
            case 'keto':
                return { icon: <FaFireAlt className="inline-block mr-1" />, bgColor: 'bg-orange-100', textColor: 'text-orange-600'};
            default:
                return { icon: null, bgColor: 'bg-gray-100', textColor: 'text-gray-600', label: restriccion };
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

                {/* Calificación en la esquina superior derecha */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-2 flex items-center">
                    {recipe.promedioCalificacion && recipe.promedioCalificacion > 0 ? (
                        <>
                            {recipe.promedioCalificacion.toFixed(1)} <FontAwesomeIcon icon={faStar} className="ml-1" />
                        </>
                    ) : (
                        <span>S/N</span>
                    )}
                </div>
            </div>

            <h2 className="text-lg font-semibold text-center mt-2">{recipe.nombre}</h2>
            <p className="text-center mb-4 text-sm">{recipe.autor}</p>
            <p className="text-center mb-4 text-sm flex-grow">{recipe.descripcion}</p>

            {/* Restricciones alimenticias en la esquina inferior izquierda */}
            <div className="absolute bottom-4 left-4 flex flex-wrap space-x-2 text-xs">
                {recipe.categorias && recipe.categorias.map((restriccion, index) => {
                    const { icon, bgColor, textColor, label } = getRestrictionStyle(restriccion);
                    return (
                        <span key={index} className={`flex items-center px-2 py-1 rounded-full ${bgColor} ${textColor}`}>
                            {icon}
                            {label}
                        </span>
                    );
                })}
            </div>

            {/* Botones en la esquina inferior derecha */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
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


