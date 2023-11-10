// //load meals data from dummy backend
///preveious work
// import { useState } from "react";
// import useHttp from "../hooks/useHttp";
// import Error from "./Error.jsx";
// import MealItem from "./MeaItem";

// const requestConfig = {};

// export default function Meals({selectedCategory}){
//     const{data:loadedMeals, isLoading,error}= useHttp('http://localhost:3000/meals',requestConfig, []);

//     // const [selectedCategory, setSelectedCategory] = useState('');
//     //if we want tot update only when changes occur we us euseeffect and give out function inside that so that it only data changes and hook re renders when change soccur
   
//    if(isLoading){
//     return <p className="center">Fetching Meals...</p>
//    }
//     //use useeffect to handle side effect like useeffect so that w enot get stuck in infinite loop

//     if(error){
//         return <Error title="failed to fetch meals" message={error}/>
//     }

//     return (
//         <div>
//           <ul id="meals">
//             {loadedMeals
//               .filter((meal) => !selectedCategory || meal.category === selectedCategory)
//               .map((meal) => (
//                 <MealItem key={meal.id} meal={meal} />
//               ))}
//           </ul>
//         </div>
//       );
//     }


import { useState } from 'react';
import useHttp from '../hooks/useHttp';
import Error from './Error.jsx';
import MealItem from './MeaItem';

const requestConfig = {};

export default function Meals({ selectedCategory, priceFilter }) {
  const { data: loadedMeals, isLoading, error } = useHttp(
    'http://localhost:3000/meals',
    requestConfig,
    []
  );

  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }


  const sortMeals = (meals, order) => {
    return meals.slice().sort((a, b) =>
      order === 'lowToHigh' ? a.price - b.price : b.price - a.price
    );
  };

  const filteredAndSortedMeals = loadedMeals
    .filter(
      (meal) =>
        !selectedCategory ||
        meal.category.toLowerCase() === selectedCategory.toLowerCase()
    )
    .sort((a, b) =>
      priceFilter === 'lowToHigh' ? a.price - b.price : b.price - a.price
    );

  return (
    <div>
      <ul id="meals">
        {filteredAndSortedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </div>
  );
}