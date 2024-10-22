import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
    const navigate = useNavigate();
    const [tituloReceta, setTituloReceta] = useState('');
    const [autor] = useState('Nombre Fijo'); // Autocompletado fijo
    const [ingredientes, setIngredientes] = useState([]);
    const [ingredienteActual, setIngredienteActual] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [restricciones, setRestricciones] = useState([]);
    const [restriccionActual, setRestriccionActual] = useState('');
    const [imagenes, setImagenes] = useState([]);

    // Función para agregar ingredientes
    const agregarIngrediente = () => {
        if (ingredienteActual) {
            setIngredientes([...ingredientes, ingredienteActual]);
            setIngredienteActual('');
        }
    };

    // Función para eliminar ingrediente
    const eliminarIngrediente = (index) => {
        setIngredientes(ingredientes.filter((_, i) => i !== index));
    };

    // Función para agregar restricciones
    const agregarRestriccion = () => {
        if (restriccionActual) {
            setRestricciones([...restricciones, restriccionActual]);
            setRestriccionActual('');
        }
    };

    // Función para eliminar restricción
    const eliminarRestriccion = (index) => {
        setRestricciones(restricciones.filter((_, i) => i !== index));
    };

    // Función para manejar la subida de imágenes
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (imagenes.length + files.length <= 3) {
            setImagenes([...imagenes, ...files]);
        } else {
            alert('Solo puedes subir un máximo de 3 imágenes.');
        }
    };

    // Validación y publicación
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que los campos requeridos no estén vacíos
        if (!tituloReceta || !ingredientes.length || !instrucciones || !imagenes.length) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Simular la publicación de la receta
        const nuevaReceta = {
            tituloReceta,
            autor,
            ingredientes,
            instrucciones,
            restricciones,
            imagenes,
        };

        console.log('Receta publicada:', nuevaReceta);
        navigate('/myrecipes'); // Redirige a /myrecipes después de publicar
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200 lg:px-8">
            {/* Contenedor de la subida de imágenes */}
            <div className="relative lg:w-1/2 w-full lg:h-auto mb-4 lg:mb-0 lg:mr-8">
                <label className="block mb-2 font-semibold">Subir Imágenes (Máximo 3)</label>
                <input 
                    type="file" 
                    accept="image/*"
                    multiple 
                    onChange={handleImageUpload} 
                    className="mb-4"
                />
                <div className="flex space-x-2">
                    {imagenes.map((imagen, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(imagen)}
                            alt={`Imagen ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg shadow-lg"
                        />
                    ))}
                </div>
            </div>

            {/* Contenedor de detalles */}
            <div className="lg:w-1/2 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6">
                    <label className="block font-semibold text-xl mb-2">Título de la Receta</label>
                    <input
                        type="text"
                        value={tituloReceta}
                        onChange={(e) => setTituloReceta(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold text-xl mb-2">Ingredientes</label>
                    <div className="flex space-x-2 mb-2">
                        <input
                            type="text"
                            value={ingredienteActual}
                            onChange={(e) => setIngredienteActual(e.target.value)}
                            className="flex-grow p-2 border border-gray-300 rounded-md"
                        />
                        <button 
                            type="button" 
                            onClick={agregarIngrediente} 
                            className="bg-brown text-white px-4 py-2 rounded-full"
                        >
                            Agregar
                        </button>
                    </div>
                    <ul className="list-disc list-inside">
                        {ingredientes.map((ingrediente, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{ingrediente}</span>
                                <button 
                                    onClick={() => eliminarIngrediente(index)} 
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <label className="block font-semibold text-xl mb-2">Instrucciones</label>
                    <textarea
                        value={instrucciones}
                        onChange={(e) => setInstrucciones(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="4"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold text-xl mb-2">Restricciones/Alimentaciones (Opcional)</label>
                    <div className="flex space-x-2 mb-2">
                        <input
                            type="text"
                            value={restriccionActual}
                            onChange={(e) => setRestriccionActual(e.target.value)}
                            className="flex-grow p-2 border border-gray-300 rounded-md"
                        />
                        <button 
                            type="button" 
                            onClick={agregarRestriccion} 
                            className="bg-brown text-white px-4 py-2 rounded-full"
                        >
                            Agregar
                        </button>
                    </div>
                    <ul className="list-disc list-inside">
                        {restricciones.map((restriccion, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{restriccion}</span>
                                <button 
                                    onClick={() => eliminarRestriccion(index)} 
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Botón de Publicar */}
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="bg-brown text-white px-6 py-3 rounded-full hover:bg-brown-700 transition duration-200"
                    >
                        Publicar Receta
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CreateRecipe;
