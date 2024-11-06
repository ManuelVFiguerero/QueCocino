import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaBreadSlice, FaGlassWhiskey, FaCarrot, FaDrumstickBite, FaSeedling } from 'react-icons/fa';
import { agregarReceta, obtenerCategorias } from '../api';
import { useAuth } from '../components/AuthContext';

const CreateRecipe = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [tituloReceta, setTituloReceta] = useState('');
    const [autor] = useState('Nombre Fijo');
    const [ingredientes, setIngredientes] = useState([]);
    const [ingredienteActual, setIngredienteActual] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [restriccionesSeleccionadas, setRestriccionesSeleccionadas] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [restriccionesDisponibles, setRestriccionesDisponibles] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categorias = await obtenerCategorias();
                setRestriccionesDisponibles(categorias);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        fetchCategorias();
    }, []);

    const getIcon = (label) => {
        switch (label) {
            case 'Apto Vegano': return <FaLeaf className="inline-block mr-1" />;
            case 'Sin TACC': return <FaBreadSlice className="inline-block mr-1" />;
            case 'Sin Lactosa': return <FaGlassWhiskey className="inline-block mr-1" />;
            case 'Apto Vegetariano': return <FaCarrot className="inline-block mr-1" />;
            case 'Keto': return <FaDrumstickBite className="inline-block mr-1" />;
            case 'Sin Frutos Secos': return <FaSeedling className="inline-block mr-1" />;
            default: return null;
        }
    };

    const getColor = (label) => {
        switch (label) {
            case 'Apto Vegano': return 'bg-green-100 text-green-600';
            case 'Sin TACC': return 'bg-red-100 text-red-600';
            case 'Sin Lactosa': return 'bg-blue-100 text-blue-600';
            case 'Apto Vegetariano': return 'bg-green-200 text-green-700';
            case 'Keto': return 'bg-orange-100 text-orange-600';
            case 'Sin Frutos Secos': return 'bg-brown-100 text-brown-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const toggleRestriccion = (nombre) => {
        if (restriccionesSeleccionadas.includes(nombre)) {
            setRestriccionesSeleccionadas(restriccionesSeleccionadas.filter((restriccion) => restriccion !== nombre));
        } else {
            setRestriccionesSeleccionadas([...restriccionesSeleccionadas, nombre]);
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

    const uploadImageToCloudinary = async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'queCocino');
        formData.append('cloud_name', 'dinvffn4v');
    
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dinvffn4v/image/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Error al subir la imagen a Cloudinary:", error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!tituloReceta || !ingredientes.length || !instrucciones || !imagenes.length) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }
    
        try {
            const imagenUrls = await Promise.all(imagenes.map(image => uploadImageToCloudinary(image)));
    
            const formData = new FormData();
            formData.append('nombre', tituloReceta);
            formData.append('autor', autor);
            formData.append('instrucciones', instrucciones);
            formData.append('idCreador', user._id);
            
            ingredientes.forEach((ingrediente, index) => {
                formData.append(`ingredientes[${index}]`, ingrediente);
            });
    
            restriccionesSeleccionadas.forEach((restriccion, index) => {
                formData.append(`categorias[${index}]`, restriccion);
            });
    
            imagenUrls.forEach((url, index) => {
                formData.append(`imagen[${index}]`, url);
            });
    
            await agregarReceta(formData);
            alert('Receta publicada con éxito.');
            navigate('/myrecipes');
        } catch (error) {
            alert('Hubo un error al publicar la receta.');
            console.error(error);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200 px-4">
            <h1 className="text-4xl font-bold text-brown-600 mb-8 text-center">Crear Receta</h1>

            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Subir Imágenes (Máximo 3)</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        multiple 
                        onChange={handleImageUpload} 
                        className="w-full mb-4"
                    />
                </div>

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
                                key={restriccion._id}
                                onClick={() => toggleRestriccion(restriccion.nombre)}
                                className={`flex items-center px-3 py-1 rounded-full ${getColor(restriccion.nombre)} text-sm font-semibold ${
                                    restriccionesSeleccionadas.includes(restriccion.nombre) ? 'ring-2 ring-offset-2' : ''
                                }`}
                            >
                                {getIcon(restriccion.nombre)}
                                {restriccion.nombre}
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
    );
};

export default CreateRecipe;
