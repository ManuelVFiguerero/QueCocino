import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';

const CalificationCard = ({ onSubmit }) => {
    const [rating, setRating] = useState(0); // Estado para guardar la calificación
    const [description, setDescription] = useState(''); // Estado para la descripción

    // Función para manejar el cambio de calificación
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    // Función para manejar el envío
    const handleSubmit = () => {
        if (rating === 0) {
            alert('Por favor, selecciona una calificación.');
            return;
        }
        const calificationData = {
            rating,
            description,
        };
        onSubmit(calificationData); // Envía la calificación al padre o realiza otra acción
        alert('Calificación enviada con éxito');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Calificar receta</h2>

            {/* Componente de estrellas de calificación */}
            <Rating
                count={5} // Total de estrellas
                size={30} // Tamaño de las estrellas
                activeColor="#ffd700" // Color de las estrellas activas
                isHalf={true} // Permitir medias estrellas
                value={rating} // Valor inicial
                onChange={handleRatingChange} // Función cuando cambia la calificación
            />

            {/* Campo de descripción */}
            <textarea
                placeholder="Agrega un comentario sobre la receta"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-4 p-2 border border-gray-300 rounded-md"
                rows="4"
            />

            {/* Botón de enviar */}
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

