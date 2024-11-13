import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; 

const SearchGrid = ({ allRecetas }) => {
    const [visibleRecipes, setVisibleRecipes] = useState([]); 
    const [recipesToShow, setRecipesToShow] = useState(15); 

    useEffect(() => {
        const initialRecipes = allRecetas.slice(0, recipesToShow);
        setVisibleRecipes(initialRecipes);
    }, [recipesToShow, allRecetas]);

    const loadMoreRecipes = () => {
        setRecipesToShow((prev) => prev + 15); 
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadMoreRecipes(); 
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {visibleRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default SearchGrid;
