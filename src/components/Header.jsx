import { useContext } from 'react';
import logoimg from '../assets/logo.jpg';
import Buttons from './UI/Buttons';
import CartContext from '../store/CartContex';
import  UserProgressContext  from '../store/UserProgressContext';

export default function Header(){
  const cartCtx =   useContext(CartContext);
  const userProgressCtx=   useContext(UserProgressContext)
  const totalcartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
      return  totalNumberOfItems+ item.quantity;
  }, 0);

  function handleShowCart(){
    userProgressCtx.showCart();
  }
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
     </nav>
    </header>
}