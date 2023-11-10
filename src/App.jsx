
import { useState } from "react";
import Cart from "./components/Cart.jsx";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CheckOut from "./components/UI/CheckOut.jsx";
import { CartContextProvider } from "./store/CartContex.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState(''); // Add this line

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header
          setSelectedCategory={setSelectedCategory}
          setPriceFilter={setPriceFilter} // Pass the setPriceFilter function
        />
        <Meals selectedCategory={selectedCategory} priceFilter={priceFilter} />
        <Cart />
        <CheckOut />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
