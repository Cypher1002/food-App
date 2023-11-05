//meal data in in meals.jsx file and we need to pass data to mealitem component
//meal contains all tyeh nam e, price etc as properties 
import { useContext } from "react"
import Buttons from "./UI/Buttons"
import { currencyFormatter } from "./util/formatting"
import CartContext from "../store/CartContex";
export default function MealItem({meal}){
   const cartCtx =  useContext(CartContext);
    
 function handelAddmealtocart(){
           cartCtx.addItem(meal);
   }

    return <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Buttons onClick={handelAddmealtocart} >
                    Add to Cart
                </Buttons>
            </p>
        </article>
    </li>
}