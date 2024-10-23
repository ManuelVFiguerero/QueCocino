import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import logo from '../assets/logo.png';
import DefaultGrid from '../components/DefaultGrid'; // Asegúrate de tener este componente
import SearchGrid from '../components/SearchGrid'; // Asegúrate de tener este componente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faFlag, faBan } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [ingredientes, setIngredientes] = useState([]);
    
    const recetas = [
        {
            tituloReceta: "Pasta de Almendra",
            autor: "Chef Juan",
            ingredientes: ["Fideos", "Pollo", "Carne", "Tomate"],
            descripcion: "Esta es una deliciosa receta de pasta de almendra que te encantará. Sencilla y rápida de preparar.",
            restricciones: ["Apto vegano", "Apto celiaco"],
            instrucciones: "Esta es una deliciosa receta de pasta de almendra que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
 
        },
        {
            tituloReceta: "Pizza Margherita",
            autor: "Chef María",
            ingredientes: ["Masa", "Tomate", "Queso", "Albahaca"],
            descripcion: "Una clásica pizza italiana con tomate fresco y albahaca.",
            restricciones: ["Apto vegetariano"],
            instrucciones: "Esta es una deliciosa receta de pizza margherita que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]

        },
        {
            tituloReceta: "Tarta de Manzana",
            autor: "Chef Ana",
            ingredientes: ["Manzanas", "Azúcar", "Harina", "Mantequilla"],
            descripcion: "Deliciosa tarta de manzana, perfecta para el postre.",
            restricciones: ["Apto celíaco"],
            instrucciones: "Esta es una deliciosa receta de tarta de manzana que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ensalada Griega",
            autor: "Chef Sofía",
            ingredientes: ["Pepino", "Tomate", "Queso Feta", "Aceitunas"],
            descripcion: "Una ensalada fresca y deliciosa con sabores mediterráneos.",
            restricciones: ["Apto vegetariano", "Sin gluten"],
            instrucciones: "Corta los ingredientes y mézclalos en un bol con aceite de oliva...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Sopa de Tomate",
            autor: "Chef Pedro",
            ingredientes: ["Tomate", "Cebolla", "Ajo", "Caldo de verduras"],
            descripcion: "Sopa caliente de tomate ideal para los días fríos.",
            restricciones: ["Apto vegano"],
            instrucciones: "Sofríe la cebolla y el ajo, añade el tomate y el caldo...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Pollo al Curry",
            autor: "Chef Clara",
            ingredientes: ["Pollo", "Curry", "Leche de coco", "Arroz"],
            descripcion: "Un plato exótico con una mezcla de especias que te sorprenderá.",
            restricciones: ["Sin gluten"],
            instrucciones: "Cocina el pollo con el curry y la leche de coco, acompaña con arroz...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Falafel",
            autor: "Chef Omar",
            ingredientes: ["Garbanzos", "Ajo", "Perejil", "Comino"],
            descripcion: "Deliciosas bolitas de garbanzo fritas, perfectas como aperitivo o plato principal.",
            restricciones: ["Apto vegano", "Sin gluten"],
            instrucciones: "Tritura los ingredientes y forma bolitas para freír...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Tacos de Pescado",
            autor: "Chef Luis",
            ingredientes: ["Pescado", "Tortillas", "Repollo", "Salsa"],
            descripcion: "Tacos frescos y sabrosos con un toque marino.",
            restricciones: ["Apto pescetariano"],
            instrucciones: "Cocina el pescado y sirve en tortillas con repollo y salsa...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Brownies de Chocolate",
            autor: "Chef Laura",
            ingredientes: ["Chocolate", "Azúcar", "Harina", "Mantequilla"],
            descripcion: "Brownies suaves y húmedos con un sabor intenso a chocolate.",
            restricciones: ["Apto vegetariano"],
            instrucciones: "Mezcla los ingredientes y hornea a 180°C por 25 minutos...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Paella de Mariscos",
            autor: "Chef Javier",
            ingredientes: ["Arroz", "Mariscos", "Pimiento", "Azafrán"],
            descripcion: "Un plato típico español lleno de sabor y mar.",
            restricciones: ["Apto pescetariano"],
            instrucciones: "Cocina los mariscos y el arroz con el azafrán...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ceviche de Camarones",
            autor: "Chef Ricardo",
            ingredientes: ["Camarones", "Limón", "Cilantro", "Cebolla"],
            descripcion: "Un plato fresco y delicioso ideal para días calurosos.",
            restricciones: ["Apto pescetariano", "Sin gluten"],
            instrucciones: "Marina los camarones en limón y mezcla con los demás ingredientes...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Galletas de Avena",
            autor: "Chef Paula",
            ingredientes: ["Avena", "Plátano", "Miel", "Pasas"],
            descripcion: "Galletas saludables perfectas para el desayuno o la merienda.",
            restricciones: ["Apto vegano"],
            instrucciones: "Mezcla los ingredientes y hornea por 15 minutos...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Empanadas de Carne",
            autor: "Chef Gabriel",
            ingredientes: ["Carne", "Cebolla", "Masa", "Aceitunas"],
            descripcion: "Empanadas jugosas con un relleno delicioso de carne y especias.",
            restricciones: ["Sin restricciones"],
            instrucciones: "Prepara el relleno y hornea las empanadas hasta que estén doradas...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Hummus Clásico",
            autor: "Chef Nadia",
            ingredientes: ["Garbanzos", "Tahini", "Ajo", "Limón"],
            descripcion: "Un dip cremoso y saludable, perfecto como aperitivo.",
            restricciones: ["Apto vegano", "Sin gluten"],
            instrucciones: "Tritura todos los ingredientes hasta obtener una mezcla suave...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ratatouille",
            autor: "Chef Remy",
            ingredientes: ["Berenjena", "Calabacín", "Tomate", "Pimiento"],
            descripcion: "Un plato francés lleno de sabor y colores vibrantes.",
            restricciones: ["Apto vegano"],
            instrucciones: "Corta las verduras y hornéalas en capas con hierbas...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Sándwich Vegetariano",
            autor: "Chef Elena",
            ingredientes: ["Pan", "Aguacate", "Lechuga", "Tomate"],
            descripcion: "Un sándwich fresco y saludable para un almuerzo rápido.",
            restricciones: ["Apto vegano"],
            instrucciones: "Arma el sándwich con los ingredientes frescos y disfruta...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Pasta de Almendra",
            autor: "Chef Juan",
            ingredientes: ["Fideos", "Pollo", "Carne", "Tomate"],
            descripcion: "Esta es una deliciosa receta de pasta de almendra que te encantará. Sencilla y rápida de preparar.",
            restricciones: ["Apto vegano", "Apto celiaco"],
            instrucciones: "Esta es una deliciosa receta de pasta de almendra que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Pizza Margherita",
            autor: "Chef María",
            ingredientes: ["Masa", "Tomate", "Queso", "Albahaca"],
            descripcion: "Una clásica pizza italiana con tomate fresco y albahaca.",
            restricciones: ["Apto vegetariano"],
            instrucciones: "Esta es una deliciosa receta de pizza margherita que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Tarta de Manzana",
            autor: "Chef Ana",
            ingredientes: ["Manzanas", "Azúcar", "Harina", "Mantequilla"],
            descripcion: "Deliciosa tarta de manzana, perfecta para el postre.",
            restricciones: ["Apto celíaco"],
            instrucciones: "Esta es una deliciosa receta de tarta de manzana que te encantará...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ensalada Griega",
            autor: "Chef Sofía",
            ingredientes: ["Pepino", "Tomate", "Queso Feta", "Aceitunas"],
            descripcion: "Una ensalada fresca y deliciosa con sabores mediterráneos.",
            restricciones: ["Apto vegetariano", "Sin gluten"],
            instrucciones: "Corta los ingredientes y mézclalos en un bol con aceite de oliva...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Sopa de Tomate",
            autor: "Chef Pedro",
            ingredientes: ["Tomate", "Cebolla", "Ajo", "Caldo de verduras"],
            descripcion: "Sopa caliente de tomate ideal para los días fríos.",
            restricciones: ["Apto vegano"],
            instrucciones: "Sofríe la cebolla y el ajo, añade el tomate y el caldo...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Pollo al Curry",
            autor: "Chef Clara",
            ingredientes: ["Pollo", "Curry", "Leche de coco", "Arroz"],
            descripcion: "Un plato exótico con una mezcla de especias que te sorprenderá.",
            restricciones: ["Sin gluten"],
            instrucciones: "Cocina el pollo con el curry y la leche de coco, acompaña con arroz...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Falafel",
            autor: "Chef Omar",
            ingredientes: ["Garbanzos", "Ajo", "Perejil", "Comino"],
            descripcion: "Deliciosas bolitas de garbanzo fritas, perfectas como aperitivo o plato principal.",
            restricciones: ["Apto vegano", "Sin gluten"],
            instrucciones: "Tritura los ingredientes y forma bolitas para freír...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Tacos de Pescado",
            autor: "Chef Luis",
            ingredientes: ["Pescado", "Tortillas", "Repollo", "Salsa"],
            descripcion: "Tacos frescos y sabrosos con un toque marino.",
            restricciones: ["Apto pescetariano"],
            instrucciones: "Cocina el pescado y sirve en tortillas con repollo y salsa...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Brownies de Chocolate",
            autor: "Chef Laura",
            ingredientes: ["Chocolate", "Azúcar", "Harina", "Mantequilla"],
            descripcion: "Brownies suaves y húmedos con un sabor intenso a chocolate.",
            restricciones: ["Apto vegetariano"],
            instrucciones: "Mezcla los ingredientes y hornea a 180°C por 25 minutos...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Paella de Mariscos",
            autor: "Chef Javier",
            ingredientes: ["Arroz", "Mariscos", "Pimiento", "Azafrán"],
            descripcion: "Un plato típico español lleno de sabor y mar.",
            restricciones: ["Apto pescetariano"],
            instrucciones: "Cocina los mariscos y el arroz con el azafrán...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ceviche de Camarones",
            autor: "Chef Ricardo",
            ingredientes: ["Camarones", "Limón", "Cilantro", "Cebolla"],
            descripcion: "Un plato fresco y delicioso ideal para días calurosos.",
            restricciones: ["Apto pescetariano", "Sin gluten"],
            instrucciones: "Marina los camarones en limón y mezcla con los demás ingredientes...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Galletas de Avena",
            autor: "Chef Paula",
            ingredientes: ["Avena", "Plátano", "Miel", "Pasas"],
            descripcion: "Galletas saludables perfectas para el desayuno o la merienda.",
            restricciones: ["Apto vegano"],
            instrucciones: "Mezcla los ingredientes y hornea por 15 minutos...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Empanadas de Carne",
            autor: "Chef Gabriel",
            ingredientes: ["Carne", "Cebolla", "Masa", "Aceitunas"],
            descripcion: "Empanadas jugosas con un relleno delicioso de carne y especias.",
            restricciones: ["Sin restricciones"],
            instrucciones: "Prepara el relleno y hornea las empanadas hasta que estén doradas...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Hummus Clásico",
            autor: "Chef Nadia",
            ingredientes: ["Garbanzos", "Tahini", "Ajo", "Limón"],
            descripcion: "Un dip cremoso y saludable, perfecto como aperitivo.",
            restricciones: ["Apto vegano", "Sin gluten"],
            instrucciones: "Tritura todos los ingredientes hasta obtener una mezcla suave...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Ratatouille",
            autor: "Chef Remy",
            ingredientes: ["Berenjena", "Calabacín", "Tomate", "Pimiento"],
            descripcion: "Un plato francés lleno de sabor y colores vibrantes.",
            restricciones: ["Apto vegano"],
            instrucciones: "Corta las verduras y hornéalas en capas con hierbas...",
            image: ["https://cdn.nutritionstudies.org/wp-content/uploads/2015/07/almond-noodles-3-1024x683.jpg", "https://www.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas-1200x675.jpg"]
        },
        {
            tituloReceta: "Sándwich Vegetariano",
            autor: "Chef Elena",
            ingredientes: ["Pan", "Aguacate", "Lechuga", "Tomate"],
            descripcion: "Un sándwich fresco y saludable para un almuerzo rápido.",
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

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200">
            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown-600 mb-4">Buscar Recetas</h1>
            <SearchBar onSearch={addIngredient} />
            
            {/* Muestra los ingredientes ingresados */}
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

            {/* Solo muestra este texto si no hay ingredientes ingresados */}
            {ingredientes.length === 0 && (
                <p className="mt-4 text-gray-600">Introduce los ingredientes para buscar recetas.</p>
            )}

            {/* Renderiza DefaultGrid o SearchGrid según los ingredientes ingresados */}
            {ingredientes.length === 0 ? (
                <DefaultGrid recetas={recetas} />
            ) : (
                <SearchGrid allRecetas={recetas} />
            )}
        </div>
    );
};

export default Home;
