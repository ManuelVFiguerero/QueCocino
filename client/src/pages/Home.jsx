import React, { useState } from 'react';
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

const Home = () => {
    const [ingredientes, setIngredientes] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [showDefaultRecipes, setShowDefaultRecipes] = useState(true); // Nuevo estado para mostrar recetas hardcoded

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

    const recetas = [
        {
            tituloReceta: "Pasta de Almendra",
            autor: "Chef Juan",
            ingredientes: ["Fideos", "Pollo", "Carne", "Tomate"],
            restricciones: ["Apto vegano", "Apto celiaco"],
            instrucciones: "Esta es una deliciosa receta de pasta de almendra que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
 
        },
        {
            tituloReceta: "Pizza Margherita",
            autor: "Chef María",
            ingredientes: ["Masa", "Tomate", "Queso", "Albahaca"],
            restricciones: ["Apto vegetariano"],
            instrucciones: "Esta es una deliciosa receta de pizza margherita que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]

        },
        {
            tituloReceta: "Tarta de Manzana",
            autor: "Chef Ana",
            ingredientes: ["Manzanas", "Azúcar", "Harina", "Mantequilla"],
            restricciones: ["Apto celíaco"],
            instrucciones: "Esta es una deliciosa receta de tarta de manzana que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ensalada Griega",
            autor: "Chef Sofía",
            ingredientes: ["Pepino", "Tomate", "Queso Feta", "Aceitunas"],
            restricciones: ["Apto vegetariano", "Sin gluten"],
            instrucciones: "Corta los ingredientes y mézclalos en un bol con aceite de oliva...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Sopa de Tomate",
            autor: "Chef Pedro",
            ingredientes: ["Tomate", "Cebolla", "Ajo", "Caldo de verduras"],
            restricciones: ["Apto vegano"],
            instrucciones: "Sofríe la cebolla y el ajo, añade el tomate y el caldo...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Pollo al Curry",
            autor: "Chef Clara",
            ingredientes: ["Pollo", "Curry", "Leche de coco", "Arroz"],
            restricciones: ["Sin gluten"],
            instrucciones: "Cocina el pollo con el curry y la leche de coco, acompaña con arroz...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Falafel",
            autor: "Chef Omar",
            ingredientes: ["Garbanzos", "Ajo", "Perejil", "Comino"],
            restricciones: ["Apto vegano", "Sin gluten"],
            instrucciones: "Tritura los ingredientes y forma bolitas para freír...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Tacos de Pescado",
            autor: "Chef Luis",
            ingredientes: ["Pescado", "Tortillas", "Repollo", "Salsa"],
            restricciones: ["Apto pescetariano"],
            instrucciones: "Cocina el pescado y sirve en tortillas con repollo y salsa...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Brownies de Chocolate",
            autor: "Chef Laura",
            ingredientes: ["Chocolate", "Azúcar", "Harina", "Mantequilla"],
            restricciones: ["Apto vegetariano"],
            instrucciones: "Mezcla los ingredientes y hornea a 180°C por 25 minutos...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Paella de Mariscos",
            autor: "Chef Javier",
            ingredientes: ["Arroz", "Mariscos", "Pimiento", "Azafrán"],
            restricciones: ["Apto pescetariano"],
            instrucciones: "Cocina los mariscos y el arroz con el azafrán...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ceviche de Camarones",
            autor: "Chef Ricardo",
            ingredientes: ["Camarones", "Limón", "Cilantro", "Cebolla"],
            restricciones: ["Apto pescetariano", "Sin gluten"],
            instrucciones: "Marina los camarones en limón y mezcla con los demás ingredientes...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Galletas de Avena",
            autor: "Chef Paula",
            ingredientes: ["Avena", "Plátano", "Miel", "Pasas"],
            restricciones: ["Apto vegano"],
            instrucciones: "Mezcla los ingredientes y hornea por 15 minutos...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Empanadas de Carne",
            autor: "Chef Gabriel",
            ingredientes: ["Carne", "Cebolla", "Masa", "Aceitunas"],
            restricciones: ["Sin restricciones"],
            instrucciones: "Prepara el relleno y hornea las empanadas hasta que estén doradas...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Hummus Clásico",
            autor: "Chef Nadia",
            ingredientes: ["Garbanzos", "Tahini", "Ajo", "Limón"],
            restricciones: ["Apto vegano", "Sin gluten"],
            instrucciones: "Tritura todos los ingredientes hasta obtener una mezcla suave...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ratatouille",
            autor: "Chef Remy",
            ingredientes: ["Berenjena", "Calabacín", "Tomate", "Pimiento"],
            restricciones: ["Apto vegano"],
            instrucciones: "Corta las verduras y hornéalas en capas con hierbas...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Sándwich Vegetariano",
            autor: "Chef Elena",
            ingredientes: ["Pan", "Aguacate", "Lechuga", "Tomate"],
            restricciones: ["Apto vegano"],
            instrucciones: "Arma el sándwich con los ingredientes frescos y disfruta...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Pasta de Almendra",
            autor: "Chef Juan",
            ingredientes: ["Fideos", "Pollo", "Carne", "Tomate"],
            restricciones: ["Apto vegano", "Apto celiaco"],
            instrucciones: "Esta es una deliciosa receta de pasta de almendra que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Pizza Margherita",
            autor: "Chef María",
            ingredientes: ["Masa", "Tomate", "Queso", "Albahaca"],
            restricciones: ["Apto vegetariano"],
            instrucciones: "Esta es una deliciosa receta de pizza margherita que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Tarta de Manzana",
            autor: "Chef Ana",
            ingredientes: ["Manzanas", "Azúcar", "Harina", "Mantequilla"],
            restricciones: ["Apto celíaco"],
            instrucciones: "Esta es una deliciosa receta de tarta de manzana que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ensalada Griega",
            autor: "Chef Sofía",
            ingredientes: ["Pepino", "Tomate", "Queso Feta", "Aceitunas"],
            restricciones: ["Apto vegetariano", "Sin gluten"],
            instrucciones: "Corta los ingredientes y mézclalos en un bol con aceite de oliva...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Sopa de Tomate",
            autor: "Chef Pedro",
            ingredientes: ["Tomate", "Cebolla", "Ajo", "Caldo de verduras"],
            restricciones: ["Apto vegano"],
            instrucciones: "Sofríe la cebolla y el ajo, añade el tomate y el caldo...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Pollo al Curry",
            autor: "Chef Clara",
            ingredientes: ["Pollo", "Curry", "Leche de coco", "Arroz"],
            restricciones: ["Sin gluten"],
            instrucciones: "Cocina el pollo con el curry y la leche de coco, acompaña con arroz...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Falafel",
            autor: "Chef Omar",
            ingredientes: ["Garbanzos", "Ajo", "Perejil", "Comino"],
            restricciones: ["Apto vegano", "Sin gluten"],
            instrucciones: "Tritura los ingredientes y forma bolitas para freír...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Tacos de Pescado",
            autor: "Chef Luis",
            ingredientes: ["Pescado", "Tortillas", "Repollo", "Salsa"],
            restricciones: ["Apto pescetariano"],
            instrucciones: "Cocina el pescado y sirve en tortillas con repollo y salsa...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Brownies de Chocolate",
            autor: "Chef Laura",
            ingredientes: ["Chocolate", "Azúcar", "Harina", "Mantequilla"],
            restricciones: ["Apto vegetariano"],
            instrucciones: "Mezcla los ingredientes y hornea a 180°C por 25 minutos...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Paella de Mariscos",
            autor: "Chef Javier",
            ingredientes: ["Arroz", "Mariscos", "Pimiento", "Azafrán"],
            restricciones: ["Apto pescetariano"],
            instrucciones: "Cocina los mariscos y el arroz con el azafrán...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ceviche de Camarones",
            autor: "Chef Ricardo",
            ingredientes: ["Camarones", "Limón", "Cilantro", "Cebolla"],
            restricciones: ["Apto pescetariano", "Sin gluten"],
            instrucciones: "Marina los camarones en limón y mezcla con los demás ingredientes...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Galletas de Avena",
            autor: "Chef Paula",
            ingredientes: ["Avena", "Plátano", "Miel", "Pasas"],
            restricciones: ["Apto vegano"],
            instrucciones: "Mezcla los ingredientes y hornea por 15 minutos...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Empanadas de Carne",
            autor: "Chef Gabriel",
            ingredientes: ["Carne", "Cebolla", "Masa", "Aceitunas"],
            restricciones: ["Sin restricciones"],
            instrucciones: "Prepara el relleno y hornea las empanadas hasta que estén doradas...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Hummus Clásico",
            autor: "Chef Nadia",
            ingredientes: ["Garbanzos", "Tahini", "Ajo", "Limón"],
            restricciones: ["Apto vegano", "Sin gluten"],
            instrucciones: "Tritura todos los ingredientes hasta obtener una mezcla suave...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ratatouille",
            autor: "Chef Remy",
            ingredientes: ["Berenjena", "Calabacín", "Tomate", "Pimiento"],
            restricciones: ["Apto vegano"],
            instrucciones: "Corta las verduras y hornéalas en capas con hierbas...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Sándwich Vegetariano",
            autor: "Chef Elena",
            ingredientes: ["Pan", "Aguacate", "Lechuga", "Tomate"],
            restricciones: ["Apto vegano"],
            instrucciones: "Arma el sándwich con los ingredientes frescos y disfruta...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        }
    ];

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