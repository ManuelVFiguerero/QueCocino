import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faFlag, faBan} from '@fortawesome/free-solid-svg-icons'; 

const Home = () => {
    const recetas = [
        {
            tituloReceta: "Pasta de Almendra",
            autor: "Chef Juan",
            ingredientes: ["Fideos", "Pollo", "Carne", "Tomate"],
            descripcion: "Esta es una deliciosa receta de pasta de almendra que te encantará. Sencilla y rápida de preparar.",
            restricciones: ["Apto vegano", "Apto celiaco"],
            instrucciones: "Esta es una deliciosa receta de pasta de almendra que te encantará...",
            image: "https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg"
        },
        {
            tituloReceta: "Pizza Margherita",
            autor: "Chef María",
            ingredientes: ["Masa", "Tomate", "Queso", "Albahaca"],
            descripcion: "Una clásica pizza italiana con tomate fresco y albahaca.",
            restricciones: ["Apto vegetariano"],
            instrucciones: "Esta es una deliciosa receta de pizza margherita que te encantará...",
            image: "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"
        },
        {
            tituloReceta: "Tarta de Manzana",
            autor: "Chef Ana",
            ingredientes: ["Manzanas", "Azúcar", "Harina", "Mantequilla"],
            descripcion: "Deliciosa tarta de manzana, perfecta para el postre.",
            restricciones: ["Apto celíaco"],
            instrucciones: "Esta es una deliciosa receta de tarta de manzana que te encantará...",
            image: "https://www.elespectador.com/resizer/KoyF5-32Hp0bWZzSmgWJhG1XkwE=/arc-anglerfish-arc2-prod-elespectador/public/KRMQHXYYBFBI5KRDXUYY5AXH2A.jpg"
        }
    ];

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200">  {/* Ajusta los colores aquí */}


            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown-600 mb-4">Buscar Recetas</h1>
            <SearchBar onSearch={() => {}} />
            <p className="mt-4 text-gray-600">Introduce los ingredientes para buscar recetas.</p>

            {/* Sección de Recetas de la Semana */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                    <FontAwesomeIcon icon={faFire} className="mr-2 text-orange-500" />
                    Recetas de la Semana
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <RecipeCard recipe={recetas[0]} />
                    <RecipeCard recipe={recetas[1]} />
                    <RecipeCard recipe={recetas[2]} />
                </div>
            </div>

            {/* Sección de Recetas Argentinas */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                    <FontAwesomeIcon icon={faFlag} className="mr-2 text-blue-600" />
                    Recetas Argentinas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <RecipeCard recipe={recetas[0]} />
                    <RecipeCard recipe={recetas[1]} />
                    <RecipeCard recipe={recetas[2]} />
                </div>
            </div>

            {/* Sección de Recetas Celíacas */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                    <FontAwesomeIcon icon={faBan} className="mr-2 text-red-600" />
                    Recetas Celíacas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <RecipeCard recipe={recetas[0]} />
                    <RecipeCard recipe={recetas[1]} />
                    <RecipeCard recipe={recetas[2]} />
                </div>
            </div>
        </div>
    );
};

export default Home;
