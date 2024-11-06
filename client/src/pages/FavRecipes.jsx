import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const FavRecipes = () => {
    const allRecetas = [
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
    

    const [visibleRecipes, setVisibleRecipes] = useState([]); // Estado para las recetas visibles
    const [recipesToShow, setRecipesToShow] = useState(15); // Estado para la cantidad de recetas a cargar

    useEffect(() => {
        // Al iniciar, carga las primeras 15 recetas o menos si no hay tantas
        const initialRecipes = allRecetas.slice(0, recipesToShow);
        setVisibleRecipes(initialRecipes);
    }, [recipesToShow]);

    // Función para cargar más recetas
    const loadMoreRecipes = () => {
        setRecipesToShow((prev) => prev + 15); // Aumenta el número de recetas mostradas en 15
    };

    // Detectar el scroll al fondo de la página
    useEffect(() => {
        const handleScroll = () => {
            // Verificar si el usuario ha llegado al fondo de la página
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadMoreRecipes(); // Cargar más recetas cuando llega al final del scroll
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup del event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200">  {/* Ajusta los colores aquí */}


            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown-600 mb-4">Recetas Favoritas</h1>


            {/* Sección de Recetas de la Semana */}
            <div className="mt-2 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {visibleRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} isFavRecipes={true} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default FavRecipes;
