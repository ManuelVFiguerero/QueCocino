import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
        setQuery('');
    };

    return (
        <div className="flex items-center mb-4 w-full max-w-md">
            <input
                type="text"
                placeholder="Buscar Ingredientes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow p-3 border-2 border-brown rounded-l-md bg-white focus:outline-none focus:ring-2 focus:ring-brown"
            />
            <button 
                onClick={handleSearch} 
                className="bg-brown text-white p-3 rounded-r-md hover:bg-brown-700 transition duration-200"
            >
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
};

export default SearchBar;


