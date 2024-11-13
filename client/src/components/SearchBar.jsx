import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch, onExecuteSearch }) => {
    const [query, setQuery] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && query.trim() !== '') {
            console.log("Agregando ingrediente:", query.toLowerCase());
            onSearch(query.toLowerCase());
            setQuery(''); 
        }
    };

    const handleSearchClick = () => {
        console.log("Ejecutando búsqueda desde el icono de lupa");
        onExecuteSearch(); 
    };

    return (
        <div className="flex items-center mb-4 w-full max-w-md">
            <input
                type="text"
                placeholder="Introduce ingredientes con Enter"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress} 
                className="flex-grow p-3 border-2 border-brown rounded-l-md bg-white focus:outline-none focus:ring-2 focus:ring-brown"
                style={{ height: '3em' }} 
            />
            <button 
                onClick={handleSearchClick} 
                className="bg-brown text-white p-3 rounded-r-md hover:bg-brown-700 transition duration-200"
                style={{ height: '3em', width: "3em" }} 
            >
                <SearchIcon style={{ color: 'white' }} />
            </button>
        </div>
    );
};

export default SearchBar;
