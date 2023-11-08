import { useContext, useState } from 'react';
import logoimg from '../assets/logo.jpg';
import Buttons from './UI/Buttons';
import CartContext from '../store/CartContex';
import  UserProgressContext  from '../store/UserProgressContext';

export default function Header({setSelectedCategory}){
  const cartCtx =   useContext(CartContext);
  const userProgressCtx=   useContext(UserProgressContext)
  const totalcartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
      return  totalNumberOfItems+ item.quantity;
  }, 0);

  // const[selctedFood, setSelectedFood] = useState("");
  // const [selectedCategory, setSelectedCategory]= useState('');
  function handleShowCart(){
    userProgressCtx.showCart();
  }
   
  function handleCategorySelect(category){
    setSelectedCategory(category);
  }
  // const handleFoodSelection = (event)=>{
  //   setSelectedFood(event.target.value);
  // };
    return <header id="main-header">
     <div id="title">
      <img  src={logoimg}alt="a resturant "/>
      <h1>
           FoodReact
      </h1>

     </div>
     <nav>
        <Buttons textOnly onClick={handleShowCart}>
               Cart({totalcartItems})
        </Buttons>

        <div className='filter-buttons'>
          <Buttons textOnly onClick={()=>handleCategorySelect('american')}>American</Buttons>
          <Buttons textOnly onClick={()=>handleCategorySelect('italian')}>Italian</Buttons>   
          <Buttons textOnly onClick={()=>handleCategorySelect('asian')}>Asian</Buttons>  
          <Buttons textOnly onClick={()=>handleCategorySelect('herbs')}>Salad</Buttons>    
        </div>
     </nav>
    </header>
}