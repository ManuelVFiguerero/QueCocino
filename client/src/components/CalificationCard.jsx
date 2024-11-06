// CalificationCard.jsx

import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';
import { agregarCalificacion } from '../api'; // Importa la función
import { useAuth } from './AuthContext'; // Para obtener el ID del usuario autenticado

const CalificationCard = ({ onSubmit, recipeId }) => {
    const [rating, setRating] = useState(0); 
    const [description, setDescription] = useState('');
    const { user } = useAuth(); // Accede al ID del usuario

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            alert('Por favor, selecciona una calificación.');
            return;
        }
        if (!user) {
            alert('Debes iniciar sesión para calificar.');
            return;
        }

        try {
            await agregarCalificacion(user._id, recipeId, rating, description); // Llama a la función
            alert('Calificación enviada con éxito');
            onSubmit({ rating, description }); // Llama a la función onSubmit
        } catch (error) {
            alert('Error al enviar la calificación.');
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Calificar receta</h2>

            <Rating
                count={5}
                size={30}
                activeColor="#ffd700"
                isHalf={true}
                value={rating}
                onChange={handleRatingChange}
            />

            <textarea
                placeholder="Agrega un comentario sobre la receta"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-4 p-2 border border-gray-300 rounded-md"
                rows="4"
            />

            <button
                onClick={handleSubmit}
                className="bg-brown text-white px-4 py-2 mt-4 rounded-full hover:bg-brown-700 transition duration-200"
            >
                Enviar Calificación
            </button>
        </div>
    );
};

export default CalificationCard;
