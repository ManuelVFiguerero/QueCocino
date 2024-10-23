import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditRecipe = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { recipe } = location.state || {};  // Obtenemos 'recipe' del state pasado al hacer navigate
    const [tituloReceta, setTituloReceta] = useState('');
    const [autor] = useState('Nombre Fijo');  // Autocompletado fijo
    const [ingredientes, setIngredientes] = useState([]);
    const [ingredienteActual, setIngredienteActual] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [restricciones, setRestricciones] = useState([]);
    const [restriccionActual, setRestriccionActual] = useState('');
    const [imagenes, setImagenes] = useState([]);

    // Cargar los datos de recipe cuando el componente se monta
    useEffect(() => {
        if (recipe) {
            setTituloReceta(recipe.tituloReceta || '');
            setIngredientes(recipe.ingredientes || []);
            setInstrucciones(recipe.instrucciones || '');
            setRestricciones(recipe.restricciones || []);
            setImagenes(recipe.image || []);
        }
    }, [recipe]);

    // Función para agregar ingredientes
    const agregarIngrediente = () => {
        if (ingredienteActual) {
            setIngredientes([...ingredientes, ingredienteActual]);
            setIngredienteActual('');
        }
    };

// Función para eliminar ingrediente
const eliminarIngrediente = (index) => {
    setIngredientes((prevIngredientes) => {
        const nuevosIngredientes = prevIngredientes.filter((_, i) => i !== index);
        console.log('Ingredientes restantes:', nuevosIngredientes);  // Verifica los ingredientes restantes
        return nuevosIngredientes;
    });
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

        // Simular la actualización de la receta
        const recetaEditada = {
            tituloReceta,
            autor,
            ingredientes,
            instrucciones,
            restricciones,
            imagenes,
        };

        console.log('Receta actualizada:', recetaEditada);
        navigate('/myrecipes');  // Redirige a /myrecipes después de confirmar los cambios
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200 lg:px-8">
            {/* Título centrado */}
            <h1 className="text-4xl font-bold text-brown-600 mb-8 text-center">Editar Receta</h1>

            {/* Contenedor de los dos segmentos: imágenes y formulario */}
            <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Contenedor de la subida de imágenes */}
                <div className="relative lg:w-1/2 w-full lg:h-auto">
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
                                src={typeof imagen === 'string' ? imagen : URL.createObjectURL(imagen)}
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
                                        type="button"  // Cambia a 'button' para evitar el envío del formulario
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

                    {/* Botón de Confirmar Cambios */}
                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="bg-brown text-white px-6 py-3 rounded-full hover:bg-brown-700 transition duration-200"
                        >
                            Confirmar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditRecipe;
