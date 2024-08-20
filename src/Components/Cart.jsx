import React, {createContext, useState} from 'react'
import Files from './Files';
import Carts from '../Pages/Cart';
import Header from './Header';
// create context
export const CartContext = createContext();


const Cart = () => {
 const [cartVal, setCartVal] = useState(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [] );
    
    
  return (
    <CartContext.Provider value={{cartVal, setCartVal}}>
        <Files />
        <Header />
        <Carts />
    </CartContext.Provider>
  )
}

export default Cart