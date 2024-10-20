import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faFlag, faBan } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <div className="flex flex-col items-center bg-gradient-to-b from-brown-100 to-brown-600 p-4"> {/* Ajusta los colores aquí */}
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
                    <RecipeCard recipe={{ title: 'Receta 1', description: 'Descripción de la receta 1' }} />
                    <RecipeCard recipe={{ title: 'Receta 2', description: 'Descripción de la receta 2' }} />
                    <RecipeCard recipe={{ title: 'Receta 3', description: 'Descripción de la receta 3' }} />
                </div>
            </div>

            {/* Sección de Recetas Argentinas */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                    <FontAwesomeIcon icon={faFlag} className="mr-2 text-blue-600" />
                    Recetas Argentinas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <RecipeCard recipe={{ title: 'Receta Argentina 1', description: 'Descripción de la receta argentina 1' }} />
                    <RecipeCard recipe={{ title: 'Receta Argentina 2', description: 'Descripción de la receta argentina 2' }} />
                    <RecipeCard recipe={{ title: 'Receta Argentina 3', description: 'Descripción de la receta argentina 3' }} />
                </div>
            </div>

            {/* Sección de Recetas Celíacas */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                    <FontAwesomeIcon icon={faBan} className="mr-2 text-red-600" />
                    Recetas Celíacas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <RecipeCard recipe={{ title: 'Receta Celíaca 1', description: 'Descripción de la receta celíaca 1' }} />
                    <RecipeCard recipe={{ title: 'Receta Celíaca 2', description: 'Descripción de la receta celíaca 2' }} />
                    <RecipeCard recipe={{ title: 'Receta Celíaca 3', description: 'Descripción de la receta celíaca 3' }} />
                </div>
            </div>
        </div>
    );
};

export default Home;




