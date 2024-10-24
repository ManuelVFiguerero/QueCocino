import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
        setQuery(''); // Limpia la barra de búsqueda después de realizar la búsqueda
    };

    return (
        <div className="flex items-center mb-4 w-full max-w-md">
            <input
                type="text"
                placeholder="Introduce los ingredientes para buscar recetas."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow p-3 border-2 border-brown rounded-l-md bg-white focus:outline-none focus:ring-2 focus:ring-brown"
                style={{ height: '3em' }} // Establece una altura fija
            />
            <button 
                onClick={handleSearch} 
                className="bg-brown text-white p-3 rounded-r-md hover:bg-brown-700 transition duration-200"
                style={{ height: '3em', width: "3em" }} // Establece la misma altura que el input
            >
                <SearchIcon style={{ color: 'white' }} />


            </button>
        </div>
    );
};

export default SearchBar;




