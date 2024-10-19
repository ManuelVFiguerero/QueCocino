import React from 'react';
import SearchBar from '../components/SearchBar';
import logo from '../assets/logo.png';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-brown-600 to-brown-200 p-4">
            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown mb-4">Buscar Recetas</h1>
            <SearchBar onSearch={() => {}} />
            <p className="mt-4 text-gray-600">Introduce los ingredientes para buscar recetas.</p>
        </div>
    );
};

export default Home;



