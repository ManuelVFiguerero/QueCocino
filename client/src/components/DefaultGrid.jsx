import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faFlag, faBan } from '@fortawesome/free-solid-svg-icons';
import RecipeCard from './RecipeCard'; 

const DefaultGrid = ({ recetas }) => {
    return (
        <div className="flex flex-col p-4">
            {/* Sección de Recetas de la Semana */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                    <FontAwesomeIcon icon={faFire} className="mr-2 text-orange-500" />
                    Recetas de la Semana
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {recetas.slice(0, 3).map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>

            {/* Sección de Recetas Argentinas */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                    <FontAwesomeIcon icon={faFlag} className="mr-2 text-blue-600" />
                    Recetas Argentinas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {recetas.slice(3,6).map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>

            {/* Sección de Recetas Celíacas */}
            <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                    <FontAwesomeIcon icon={faBan} className="mr-2 text-red-600" />
                    Recetas Celíacas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {recetas.slice(6, 9).map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DefaultGrid;
