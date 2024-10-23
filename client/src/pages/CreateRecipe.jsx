import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaBreadSlice, FaGlassWhiskey, FaCarrot, FaDrumstickBite, FaSeedling } from 'react-icons/fa'; // Íconos para las restricciones

const CreateRecipe = () => {
    const navigate = useNavigate();
    const [tituloReceta, setTituloReceta] = useState('');
    const [autor] = useState('Nombre Fijo'); // Autocompletado fijo
    const [ingredientes, setIngredientes] = useState([]);
    const [ingredienteActual, setIngredienteActual] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [restriccionesSeleccionadas, setRestriccionesSeleccionadas] = useState([]);
    const [imagenes, setImagenes] = useState([]);

    // Lista de restricciones alimentarias disponibles
    const restriccionesDisponibles = [
        { id: 'vegano', label: 'Apto Vegano', icon: <FaLeaf className="inline-block mr-1" />, color: 'bg-green-100 text-green-600' },
        { id: 'celiaco', label: 'Sin TACC', icon: <FaBreadSlice className="inline-block mr-1" />, color: 'bg-red-100 text-red-600' },
        { id: 'sinLactosa', label: 'Sin Lactosa', icon: <FaGlassWhiskey className="inline-block mr-1" />, color: 'bg-blue-100 text-blue-600' },
        { id: 'vegetariano', label: 'Apto Vegetariano', icon: <FaCarrot className="inline-block mr-1" />, color: 'bg-green-200 text-green-700' },
        { id: 'keto', label: 'Keto', icon: <FaDrumstickBite className="inline-block mr-1" />, color: 'bg-orange-100 text-orange-600' },
        { id: 'sinFrutosSecos', label: 'Sin Frutos Secos', icon: <FaSeedling className="inline-block mr-1" />, color: 'bg-brown-100 text-brown-600' }
    ];

    // Agregar o quitar restricciones seleccionadas
    const toggleRestriccion = (id) => {
        if (restriccionesSeleccionadas.includes(id)) {
            setRestriccionesSeleccionadas(restriccionesSeleccionadas.filter((restriccion) => restriccion !== id));
        } else {
            setRestriccionesSeleccionadas([...restriccionesSeleccionadas, id]);
        }
    };

    const agregarIngrediente = () => {
        if (ingredienteActual) {
            setIngredientes([...ingredientes, ingredienteActual]);
            setIngredienteActual('');
        }
    };

    const eliminarIngrediente = (index) => {
        setIngredientes(ingredientes.filter((_, i) => i !== index));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (imagenes.length + files.length <= 3) {
            setImagenes([...imagenes, ...files]);
        } else {
            alert('Solo puedes subir un máximo de 3 imágenes.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tituloReceta || !ingredientes.length || !instrucciones || !imagenes.length) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        const nuevaReceta = {
            tituloReceta,
            autor,
            ingredientes,
            instrucciones,
            restricciones: restriccionesSeleccionadas, // Las restricciones seleccionadas
            imagenes,
        };

        console.log('Receta publicada:', nuevaReceta);
        navigate('/myrecipes');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200 lg:px-8">
            <h1 className="text-4xl font-bold text-brown-600 mb-8 text-center">Crear Receta</h1>

            <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-8 lg:space-y-0 lg:space-x-8">
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
                        <div className="flex flex-wrap gap-2">
                            {restriccionesDisponibles.map((restriccion) => (
                                <button
                                    key={restriccion.id}
                                    onClick={() => toggleRestriccion(restriccion.id)}
                                    className={`flex items-center px-3 py-1 rounded-full ${restriccion.color} text-sm font-semibold ${
                                        restriccionesSeleccionadas.includes(restriccion.id) ? 'ring-2 ring-offset-2' : ''
                                    }`}
                                >
                                    {restriccion.icon}
                                    {restriccion.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <button 
                            type="submit" 
                            onClick={handleSubmit}
                            className="bg-brown text-white px-6 py-3 rounded-full hover:bg-brown-700 transition duration-200"
                        >
                            Publicar Receta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRecipe;

