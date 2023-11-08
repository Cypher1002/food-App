import { useState } from "react";
import Cart from "./components/Cart.jsx";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CheckOut from "./components/UI/CheckOut.jsx";
import { CartContextProvider } from "./store/CartContex.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  const[selectedCataegory,setSelectedCategory ] = useState('');
  return (
<UserProgressContextProvider>
    <CartContextProvider>
      <Header setSelectedCategory={setSelectedCategory}/>
       <Meals selectedCategory={selectedCataegory}/>
       <Cart/>
       <CheckOut/>
    </CartContextProvider>
</UserProgressContextProvider>
  );
}

export default App;
