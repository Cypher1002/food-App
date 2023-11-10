
// import { useContext, useState } from 'react';
// import logoimg from '../assets/logo.jpg';
// import Buttons from './UI/Buttons';
// import CartContext from '../store/CartContex';
// import UserProgressContext from '../store/UserProgressContext';

// export default function Header({ setSelectedCategory }) {
//   const cartCtx = useContext(CartContext);
//   const userProgressCtx = useContext(UserProgressContext);
//   const totalcartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
//     return totalNumberOfItems + item.quantity;
//   }, 0);

//   const categories = ['american', 'italian', 'asian', 'herbs'];

//   function handleShowCart() {
//     userProgressCtx.showCart();
//   }

//   return (
//     <header id="main-header">
//       <div id="title">
//         <img src={logoimg} alt="a restaurant" />
//         <h1>FoodReact</h1>
//       </div>
//       <nav>
//         <Buttons textOnly onClick={handleShowCart}>
//           Cart({totalcartItems})
//         </Buttons>
//         <div className="filter-buttons">
//           <label htmlFor="category">Select Category: </label>
//           <select
//             id="category"
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>
//       </nav>
//     </header>
//   );
// }



import { useContext, useState } from 'react';
import logoimg from '../assets/logo.jpg';
import Buttons from './UI/Buttons';
import CartContext from '../store/CartContex';
import UserProgressContext from '../store/UserProgressContext';

export default function Header({ setSelectedCategory, setPriceFilter }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalcartItems = cartCtx.items.reduce(
    (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
    0
  );

  const categories = ['american', 'italian', 'asian', 'herbs'];

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoimg} alt="a restaurant" />
        <h1>FoodReact</h1>
      </div>
      <nav>
        <Buttons textOnly onClick={handleShowCart}>
          Cart({totalcartItems})
        </Buttons>
        <div className="filter-buttons">
          <label htmlFor="category">Select Category: </label>
          <select
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="price">Sort by Price: </label>
          <select id="price" onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

