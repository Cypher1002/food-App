//load meals data from dummy backend

import useHttp from "../hooks/useHttp";
import Error from "./Error.jsx";
import MealItem from "./MeaItem";

const requestConfig = {};

export default function Meals(){
    const{data:loadedMeals, isLoading,error}= useHttp('http://localhost:3000/meals',requestConfig, []);
    //if we want tot update only when changes occur we us euseeffect and give out function inside that so that it only data changes and hook re renders when change soccur
   
   if(isLoading){
    return <p className="center">Fetching Meals...</p>
   }
    //use useeffect to handle side effect like useeffect so that w enot get stuck in infinite loop

    if(error){
        return <Error title="failed to fetch meals" message={error}/>
    }

    return (<ul id="meals">
        {loadedMeals.map((meal)=> (<MealItem key={meal.id} meal={meal}/>))}
    </ul>
    );
}