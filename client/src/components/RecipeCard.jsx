import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

const RecipeCard = ({ recipe }) => {
    return (
        <div className="border rounded-lg p-4 mb-4 bg-white shadow-lg w-80 flex flex-col"> {/* Cambiar el ancho aquí y añadir flex-col */}
            <img src={recipe.image} className="w-full h-48 object-cover rounded" /> {/* Ajusta la altura de la imagen */}
            <h2 className="text-lg font-semibold text-center mt-2">{recipe.tituloReceta}</h2> {/* Cambiar a un texto más fino */}
            <p className="text-center mb-4 text-sm">{recipe.autor}</p>
            <p className="text-center mb-4 text-sm flex-grow">{recipe.descripcion}</p> {/* Cambiar el tamaño de la fuente y añadir flex-grow */}
            
            <div className="flex justify-end space-x-2 mt-auto"> {/* Alineación a la derecha con espacio entre botones */}
                <button className="bg-white text-brown text-xs px-3 py-1 rounded-full border border-brown hover:bg-brown-100 transition duration-200">Guardar</button> {/* Botón de Guardar */}
                
                {/* Enlace al detalle de la receta con el objeto recipe como estado */}
                <Link 
                    to="/recipedetails" 
                    state={{ recipe }} // Enviando el objeto recipe como estado
                    className="bg-brown text-white text-xs px-3 py-1 rounded-full hover:bg-brown-700 transition duration-200" // Usar estilos como en el botón
                >
                    Ver Más
                </Link> 
            </div>
        </div>
    );
};

export default RecipeCard;







