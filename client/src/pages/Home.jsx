import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import logo from '../assets/logo.png';
import DefaultGrid from '../components/DefaultGrid';
import SearchGrid from '../components/SearchGrid';
import { buscarRecetas } from '../api'; // Importamos la función de búsqueda en el backend
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faBreadSlice, faTint, faCarrot, faFire, faBan } from '@fortawesome/free-solid-svg-icons';
import { obtenerRecetaPorId } from '../api'; // Asegúrate de importar correctamente la función

const Home = () => {
    const [ingredientes, setIngredientes] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [showDefaultRecipes, setShowDefaultRecipes] = useState(true); // Nuevo estado para mostrar recetas hardcoded
    const [recetas, setRecetas] = useState([]);

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((f) => f !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const filterOptions = [
        { name: 'Apto Vegano', icon: faLeaf, color: 'bg-green-200 text-green-800' },
        { name: 'Sin TACC', icon: faBreadSlice, color: 'bg-red-200 text-red-800' },
        { name: 'Sin Lactosa', icon: faTint, color: 'bg-blue-200 text-blue-800' },
        { name: 'Apto Vegetariano', icon: faCarrot, color: 'bg-green-300 text-green-800' },
        { name: 'Keto', icon: faFire, color: 'bg-orange-200 text-orange-800' },
        { name: 'Sin Frutos Secos', icon: faBan, color: 'bg-brown-200 text-brown-800' },
    ];

    // IDs de las recetas predeterminadas
    const recetaIds = [
        '6732669926dfc08eb5ec2ef7',
        '672be74ff49fce1f46422a2b',
        '672bdfb6f49fce1f46422a24'
    ];

    // Cargar las recetas por sus IDs al montar el componente
    useEffect(() => {
        const cargarRecetas = async () => {
            try {
                // Utilizar Promise.all para obtener todas las recetas en paralelo
                const recetasData = await Promise.all(
                    recetaIds.map(id => obtenerRecetaPorId(id))
                );
                setRecetas(recetasData); // Guardar los datos completos de las recetas en el estado
            } catch (error) {
                console.error('Error al cargar las recetas:', error);
            }
        };

        cargarRecetas();
    }, []);

    const addIngredient = (ingredient) => {
        if (ingredient && !ingredientes.includes(ingredient)) {
            setIngredientes([...ingredientes, ingredient]);
        }
    };

    const removeIngredient = (ingredientToRemove) => {
        setIngredientes(ingredientes.filter(ingredient => ingredient !== ingredientToRemove));
    };

    const executeSearch = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        console.log("Ejecutando búsqueda con ingredientes:", ingredientes);
        console.log("Ejecutando búsqueda con restricciones:", selectedFilters);

        try {
            const results = await buscarRecetas(ingredientes, selectedFilters);
            console.log("Resultados de búsqueda:", results);
            setSearchResults(results);
            setShowDefaultRecipes(false); // Ocultar recetas hardcoded
        } catch (error) {
            console.error("Error al buscar recetas:", error);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200">
            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown-600 mb-4">Buscar Recetas</h1>
            
            {/* Search Bar */}
            <SearchBar onSearch={addIngredient} onExecuteSearch={executeSearch} />
            
            {/* Ingredientes seleccionados */}
            <div className="flex flex-wrap mt-4">
                {ingredientes.length > 0 && ingredientes.map((ingredient, index) => (
                    <div key={index} className="flex items-center border border-gray-400 rounded-full bg-transparent px-3 py-1 mr-2 mb-2">
                        <span className="text-gray-800">{ingredient}</span>
                        <button 
                            onClick={() => removeIngredient(ingredient)} 
                            className="ml-2 text-gray-600 text-sm"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Botón Filtros */}
            <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="mb-4 bg-brown text-white px-4 py-2 rounded-full hover:bg-brown-700 transition duration-200"
            >
                {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>

            {/* Opciones de Filtros */}
            {showFilters && (
                <div className="flex flex-wrap justify-center mt-4 mb-4">
                    {filterOptions.map((filter) => (
                        <button
                            key={filter.name}
                            onClick={() => toggleFilter(filter.name)}
                            className={`flex items-center border px-3 py-1 m-2 rounded-full ${filter.color} ${
                                selectedFilters.includes(filter.name) ? 'border-2 border-black' : ''
                            }`}
                        >
                            <FontAwesomeIcon icon={filter.icon} className="mr-2" />
                            {filter.name}
                        </button>
                    ))}
                </div>
            )}
            
            {/* Grid de recetas */}
            {showDefaultRecipes ? (
                <DefaultGrid recetas={recetas} />
            ) : (
                <SearchGrid allRecetas={searchResults} selectedFilters={selectedFilters} />
            )}
        </div>
    );
};

export default Home;