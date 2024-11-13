import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import CalificationCard from '../components/CalificationCard';
import { FaLeaf, FaBreadSlice, FaTint, FaCarrot, FaFireAlt, FaStar } from 'react-icons/fa'; 
import { agregarAFavoritos } from '../api';
import { useAuth } from '../components/AuthContext';

const RecipeDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { recipe } = location.state || {}; 
    const { isAuthenticated, user } = useAuth();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const images = recipe?.imagen && recipe.imagen.length > 0 
        ? recipe.imagen 
        : ['ruta_de_imagen_por_defecto.png'];

    const handleGuardarReceta = async () => {
        if (!isAuthenticated || !user) {
            alert('Por favor, inicia sesión para guardar la receta.');
            return;
        }

        try {
            await agregarAFavoritos(user._id, recipe._id);
            alert('Receta guardada en favoritos.');
        } catch (error) {
            console.error('Error al guardar la receta en favoritos:', error);
            alert('Hubo un error al guardar la receta.');
        }
    };

    const changeImage = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    const getRestrictionStyle = (restriccion) => {
        switch (restriccion.toLowerCase()) {
            case 'sin tacc':
                return {
                    icon: <FaBreadSlice className="inline-block mr-1" />,
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-600',
                    label: 'Sin TACC',
                };
            case 'sin lactosa':
                return {
                    icon: <FaTint className="inline-block mr-1" />,
                    bgColor: 'bg-blue-100',
                    textColor: 'text-blue-600',
                    label: 'Sin Lactosa',
                };
            case 'apto vegano':
                return {
                    icon: <FaLeaf className="inline-block mr-1" />,
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-600',
                    label: 'Apto Vegano',
                };
            case 'apto vegetariano':
                return {
                    icon: <FaCarrot className="inline-block mr-1" />,
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-700',
                    label: 'Apto Vegetariano',
                };
            case 'keto':
                return {
                    icon: <FaFireAlt className="inline-block mr-1" />,
                    bgColor: 'bg-orange-100',
                    textColor: 'text-orange-600',
                    label: 'Keto',
                };
            default:
                return {
                    icon: null,
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-600',
                    label: restriccion,
                };
        }
    };

    if (!recipe) {
        return <p>No se encontró la receta.</p>;
    }

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200 lg:px-8">
            <button 
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 bg-white text-brown px-3 py-1 rounded-full border border-brown hover:bg-brown-100 transition duration-200"
            >
                ← Volver
            </button>

            <div className="relative lg:w-1/2 w-full lg:h-auto mb-4 lg:mb-0 lg:mr-8">
                {/* Círculo de calificación */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-2 flex items-center">
                    {recipe.promedioCalificacion && recipe.promedioCalificacion > 0 ? (
                        <>
                            {recipe.promedioCalificacion.toFixed(1)} <FaStar className="ml-1" />
                        </>
                    ) : (
                        <span>S/N</span> 
                    )}
                </div>

                <img 
                    src={images[currentImageIndex]} 
                    alt="Imagen de la receta"
                    className="w-full h-64 lg:h-auto object-cover rounded-lg shadow-lg" 
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

            <div className="lg:w-1/2 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold mb-1">{recipe.tituloReceta}</h2>
                    <p className="text-lg mb-4">{recipe.autor}</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Ingredientes</h2>
                    <ul className="list-disc list-inside text-lg mt-2">
                        {recipe.ingredientes && recipe.ingredientes.map((ingrediente, index) => (
                            <li key={index}>{ingrediente}</li>
                        ))}
                    </ul>
                </div>

                {recipe.categorias && recipe.categorias.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">Restricciones</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {recipe.categorias.map((restriccion, index) => {
                                const { icon, bgColor, textColor, label } = getRestrictionStyle(restriccion);
                                return (
                                    <span
                                        key={index}
                                        className={`px-3 py-1 rounded-full ${bgColor} ${textColor} flex items-center`}
                                    >
                                        {icon}
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Instrucciones</h2>
                    <p className="text-lg mt-2">{recipe.instrucciones}</p>
                </div>

                <div className="flex flex-col lg:flex-row justify-around space-y-4 lg:space-y-0 lg:space-x-4">
                    <button 
                        className="bg-brown text-white px-4 py-2 rounded-full hover:bg-brown-700 transition duration-200"
                        onClick={handleGuardarReceta}
                    >
                        Guardar Receta
                    </button>
                    <button 
                        className="bg-white text-brown px-5 py-2 rounded-full border border-brown hover:bg-brown-100 transition duration-200"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Calificar Receta
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CalificationCard 
                    onSubmit={(calificationData) => {
                        console.log('Datos de calificación:', calificationData);
                        setIsModalOpen(false);
                    }}
                    recipeId={recipe._id}
                />
            </Modal>
        </div>
    );
};

export default RecipeDetails;