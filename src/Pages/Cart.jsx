import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Components/Cart";
import { FaShoppingCart, FaTshirt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartt = useContext(CartContext);
  const [products, setProducts] = useState([]);
  

useEffect(() => {
  setProducts(JSON.parse(localStorage.getItem("cartItems")));

}, []);
  


  const addToCart = (product) => {
    cartt.setCartVal((prev) => {
    //   localStorage.setItem("cartItems", JSON.stringify([...prev, product]));

      return [...prev, product];
    });

  };

  const removeFromCart = (product) => {
    cartt.setCartVal(() => {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartt.cartVal.filter((item) => item.id !== product.id))
      );
      return cartt.cartVal.filter((item) => item.id !== product.id);
    });
    console.log(cartt.cartVal);
  };

    // reference the collection to access
    

  return (
    <div className="p-5">
      <div className="clothes flex md:flex-nowrap flex-wrap items-center  gap-10 mt-10">
        {products.map((product) => (
          <div
            key={product.id}
            className=" relative z-10 bg-black transition-bg 0.3s ease-in-out p-4 cloth md:w-3/6 w-full  shadow-sm shadow-slate-900 rounded-xl"
          >
            <div>
              <img src={product.url} alt="" className="shadow-md rounded-md" />
            </div>
            <div className="details py-5 px-3">
              <h3 className="font-medium text-white border-b pb-4 border-slate-800">
                Name : {product.productName}
              </h3>
              <h3 className="font-medium text-white border-b py-4 border-slate-800">
                Product-Category : {product.productCategory}
              </h3>
              <h4 className="font-medium py-3 text-white border-b pb-4 border-slate-800">
                Price :{" "}
                <span className="text-green-800 font-bold text-sm">
                  ₦{product.productPrice}
                </span>
              </h4>

              <div className="flex justify-between flex-wrap gap-5 items-center mt-5">
                <button
                  onClick={() => {
                    addToCart(product);
                  }}
                  className=" focus:hidden flex relative z-20 gap-3 items-center text-[12px]  bg-black border border-green-900 p-2 py-3 px-3 rounded-full text-white font-bold "
                >
                  Add to Cart <FaShoppingCart className="text-green-950" />
                </button>
                <button
                  onClick={() => {
                    removeFromCart(product);
                  }}
                  className=" flex relative z-20 gap-3 items-center text-[12px]  bg-black border border-green-900 p-2 py-3 px-3 rounded-full text-white font-bold "
                >
                  Remove from Cart <FaShoppingCart className="text-green-950" />
                </button>
                <button className=" flex gap-3 my-2  items-center bg-black border border-green-900 p-2 px-3 rounded-full text-white py-3 font-bold text-[12px]">
                  Place Order <FaPhone className="text-green-950" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
