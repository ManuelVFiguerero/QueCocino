import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../components/Modal';
import CalificationCard from '../components/CalificationCard';
import { FaLeaf, FaBreadSlice } from 'react-icons/fa';
import { agregarAFavoritos } from '../api'; // Importa la función para agregar a favoritos
import { useAuth } from '../components/AuthContext'; // Para obtener el ID del usuario autenticado

const RecipeDetails = () => {
    const location = useLocation(); 
    const { recipe } = location.state || {}; 
    const { isAuthenticated, user } = useAuth(); // Para obtener el usuario autenticado
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const images = recipe?.image || []; // Asegúrate de que `images` esté definido

    const handleGuardarReceta = async () => {
        if (!isAuthenticated || !user) {
            alert('Por favor, inicia sesión para guardar la receta.');
            return;
        }

        try {
            console.log("Intentando guardar receta en favoritos...");
            console.log("ID de usuario:", user._id); // user._id debería existir si `user` está definido correctamente
            console.log("ID de receta:", recipe._id);

            await agregarAFavoritos(user._id, recipe._id); // Asegúrate de que `user._id` y `recipe._id` existan
            alert('Receta guardada en favoritos.');
        } catch (error) {
            console.error('Error al guardar la receta en favoritos:', error);
            alert('Hubo un error al guardar la receta.');
        }
    };

    // Función para cambiar la imagen (previa/siguiente)
    const changeImage = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    if (!recipe) {
        return <p>No se encontró la receta.</p>;
    }

    // Obtener el estilo y el ícono para cada restricción
    const getRestrictionStyle = (restriccion) => {
        switch (restriccion.toLowerCase()) {
            case 'apto celiaco':
                return {
                    icon: <FaBreadSlice className="inline-block mr-1" />,
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-600',
                    label: 'Sin TACC',
                };
            case 'apto vegano':
                return {
                    icon: <FaLeaf className="inline-block mr-1" />,
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-600',
                    label: 'Apto Vegano',
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

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200 lg:px-8"> 
            {/* Contenedor de la imagen con carrusel */}
            <div className="relative lg:w-1/2 w-full lg:h-auto mb-4 lg:mb-0 lg:mr-8">
                <img 
                    src={images[currentImageIndex]} 
                    alt="Imagen de la receta"
                    className="w-full h-64 lg:h-auto object-cover rounded-lg shadow-lg" 
                />

                {/* Flechas de navegación minimalistas */}
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

                {/* Indicadores de imagen (circulitos) */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <span 
                            key={index} 
                            className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-brown' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Contenedor de detalles */}
            <div className="lg:w-1/2 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold mb-1">{recipe.tituloReceta}</h2>
                    <p className="text-lg mb-4">{recipe.autor}</p>
                </div>

                {/* Ingredientes */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Ingredientes</h2>
                    <ul className="list-disc list-inside text-lg mt-2">
                        {recipe.ingredientes.map((ingrediente, index) => (
                            <li key={index}>{ingrediente}</li>
                        ))}
                    </ul>
                </div>

                {/* Instrucciones */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Instrucciones</h2>
                    <p className="text-lg mt-2">{recipe.instrucciones}</p>
                </div>

                {/* Restricciones */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Restricciones/Alimentaciones</h2>
                    <div className="flex space-x-2">
                        {recipe.restricciones.map((restriccion, index) => {
                            const { icon, bgColor, textColor, label } = getRestrictionStyle(restriccion);
                            return (
                                <span 
                                    key={index} 
                                    className={`flex items-center px-3 py-1 rounded-full ${bgColor} ${textColor} text-sm font-semibold`}
                                >
                                    {icon}
                                    {label}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col lg:flex-row justify-around space-y-4 lg:space-y-0 lg:space-x-4">
                    <button 
                        className="bg-brown text-white px-4 py-2 rounded-full hover:bg-brown-700 transition duration-200"
                        onClick={handleGuardarReceta} // Vincula con la función
                    >
                        Guardar Receta
                    </button>
                    <button 
                        className="bg-white text-brown px-5 py-2 rounded-full border border-brown hover:bg-brown-100 transition duration-200"
                        onClick={() => setIsModalOpen(true)} // Abre el modal
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
                    recipeId={recipe._id} // Pasa el ID de la receta
                />
            </Modal>
        </div>
    );
};

export default RecipeDetails;
