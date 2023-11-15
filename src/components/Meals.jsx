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


// import { useState } from 'react';
// import useHttp from '../hooks/useHttp';
// import Error from './Error.jsx';
// import MealItem from './MeaItem';

// const requestConfig = {};

// export default function Meals({ selectedCategory, priceFilter }) {
//   const { data: loadedMeals, isLoading, error } = useHttp(
//     'http://localhost:3000/meals',
//     requestConfig,
//     []
//   );

//   if (isLoading) {
//     return <p className="center">Fetching Meals...</p>;
//   }

//   if (error) {
//     return <Error title="Failed to fetch meals" message={error} />;
//   }


//   const sortMeals = (meals, order) => {
//     return meals.slice().sort((a, b) =>
//       order === 'lowToHigh' ? a.price - b.price : b.price - a.price
//     );
//   };

//   const filteredAndSortedMeals = loadedMeals
//     .filter(
//       (meal) =>
//         !selectedCategory ||
//         meal.category.toLowerCase() === selectedCategory.toLowerCase()
//     )
//     .sort((a, b) =>
//       priceFilter === 'lowToHigh' ? a.price - b.price : b.price - a.price
//     );

//   return (
//     <div>
//       <ul id="meals">
//         {filteredAndSortedMeals.map((meal) => (
//           <MealItem key={meal.id} meal={meal} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import useHttp from '../hooks/useHttp';
// import Error from './Error.jsx';
// import MealItem from './MeaItem';

// const requestConfig = {};

// export default function Meals({ selectedCategory, priceFilter }) {
//   const { data: loadedMeals, isLoading, error } = useHttp(
//     'http://localhost:3000/meals',
//     requestConfig,
//     []
//   );
//   const [sortedMeals, setSortedMeals] = useState([]);

//   useEffect(() => {
//     // Function to filter and sort meals
//     const filterAndSortMeals = () => {
//       const filteredMeals = loadedMeals.filter((meal) => {
//         const categoryMatches =
//           !selectedCategory ||
//           meal.category.toLowerCase() === selectedCategory.toLowerCase();

//         return categoryMatches;
//       });

//       const sorted = sortMeals(filteredMeals, priceFilter);

//       setSortedMeals(sorted);
//     };

//     filterAndSortMeals();
//   }, [selectedCategory, priceFilter, loadedMeals]);

//   const sortMeals = (meals, order) => {
//     return meals.reduce((sorted, meal) => {
//       if (!order || order === 'lowToHigh') {
//         // Insert into sorted array in ascending order
//         let i = 0;
//         while (i < sorted.length && meal.price > sorted[i].price) {
//           i++;
//         }
//         sorted.splice(i, 0, meal);
//       } else {
//         // Insert into sorted array in descending order
//         let i = 0;
//         while (i < sorted.length && meal.price < sorted[i].price) {
//           i++;
//         }
//         sorted.splice(i, 0, meal);
//       }
//       return sorted;
//     }, []);
//   };
  

//   if (isLoading) {
//     return <p className="center">Fetching Meals...</p>;
//   }

//   if (error) {
//     return <Error title="Failed to fetch meals" message={error} />;
//   }

//   return (
//     <div>
//       <ul id="meals">
//         {sortedMeals.map((meal) => (
//           <MealItem key={meal.id} meal={meal} />
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
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
  const [sortedMeals, setSortedMeals] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);

  useEffect(() => {
    const filterAndSortMeals = () => {
      const filteredMeals = [];
      
      for (const meal of loadedMeals) {
        const categoryMatches =
          !selectedCategory ||
          meal.category.toLowerCase() === selectedCategory.toLowerCase();

        const ratingMatches = !ratingFilter || meal.rating === ratingFilter;

        if (categoryMatches && ratingMatches) {
          // Insert into filtered array
          let i = 0;
          while (i < filteredMeals.length && meal.price > filteredMeals[i].price) {
            i++;
          }
          filteredMeals.splice(i, 0, meal);
        }
      }

      const sorted = sortMeals(filteredMeals, priceFilter);
      setSortedMeals(sorted);
    };

    filterAndSortMeals();
  }, [selectedCategory, priceFilter, ratingFilter, loadedMeals]);

  const sortMeals = (meals, order) => {
    return meals.reduce((sorted, meal) => {
      if (!order || order === 'lowToHigh') {
        // Insert into sorted array in ascending order
        let i = 0;
        while (i < sorted.length && meal.price > sorted[i].price) {
          i++;
        }
        sorted.splice(i, 0, meal);
      } else {
        // Insert into sorted array in descending order
        let i = 0;
        while (i < sorted.length && meal.price < sorted[i].price) {
          i++;
        }
        sorted.splice(i, 0, meal);
      }
      return sorted;
    }, []);
  };

  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <div>
      <div className="filter-buttons-rating">
        <label htmlFor="rating">Filter by Rating: </label>
        <select id="rating" onChange={(e) => setRatingFilter(Number(e.target.value))}>
          <option value="">All Ratings</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>
      <ul id="meals">
        {sortedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </div>
  );
}
