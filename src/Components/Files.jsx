import React, { useEffect, useState, useContext } from "react";
import { FaShoppingCart, FaTshirt, FaPhone } from "react-icons/fa";
import one from "../assets/bgimg.jpg";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";
import { CartContext } from "./Cart";

import { collection, getDocs } from "firebase/firestore";

const Files = () => {
  const cartt = useContext(CartContext);
  console.log(cartt);
  const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState([]);

  // Create CartContext

  const addToCart = (product) => {
    cartt.setCartVal((prev) => {
      localStorage.setItem("cartItems", JSON.stringify([...prev, product]));

      return [...prev, product];
    });

    console.log(cartt.cartVal);
  };

  const removeFromCart = (product) => {

    cartt.setCartVal(()=> {
      localStorage.setItem("cartItems", JSON.stringify(cartt.cartVal.filter((item) => item.id !== product.id)));
      return cartt.cartVal.filter((item) => item.id !== product.id)
    });
    console.log(cartt.cartVal);

  };

  
  // const handleNext = () => {
  //   setCurrentIndex(prev => (prev + 1) % )
  // }

  // const handlePrev = () => {
  //   setCurrentIndex(prev => (prev - 1 + ))
  // }

  useEffect(() => {
    // reference the collection to access
    const productCollectionRef = collection(db, "products");

    const getProducts = async () => {
      const querySnapshot = await getDocs(productCollectionRef);
      const productData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);
    };

    getProducts();
  }, []);

  return (
    <div>
      <div className=" relative py-20 md:pt-40   px-10 top-10 ">
        <div className="left text-slate-200 relative flex flex-col items-center justify-center w-full -top-10   p-10  shadow-2xl rounded-md ">
          <div>
            <h3 className="text-4xl text-center mb-3">
              New Testament Clothing
            </h3>
            <h5 className="text-sm my-3 border-b text-center border-dashed border-slate-700 p-4">
              Quality affordable products well sell
            </h5>
          </div>
          <button className="mt-5 bg-green-900 shadow-md text-white p-3 px-5 rounded-md flex items-center gap-1 ">
            Call us <FaPhone />
          </button>
        </div>
      </div>
      <div className="best-sellers bg-black bg-opacity-[0.1] border-t border-slate-800 relative p-10">
        <h2 className="text-3xl flex items-center justify-center text-slate-200 gap-3 my-2">
          Best-Seller <FaTshirt className=" text-green-900 text-5xl" />
        </h2>
        <div className="clothes flex md:flex-nowrap flex-wrap items-center  gap-10 mt-10">
          {products.map((product) => (
            <div
              key={product.id}
              className=" relative z-10   transition-bg 0.3s ease-in-out p-4 cloth md:w-3/6 w-full  shadow-md shadow-slate-900 rounded-xl"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.url}
                  alt=""
                  className="shadow-md rounded-md"
                />
              </Link>
              <div className="details py-5 px-3">
                <h3 className="font-medium text-white text-xl border-b pb-4 py-5 border-slate-600">
                  Name : {product.productName}
                </h3>
                <h3 className="font-medium text-white border-b py-6 border-slate-600">
                  Product-Category : {product.productCategory}
                </h3>
                <h4 className="font-medium py-3 text-white border-b py-4 border-slate-600">
                  Price :{" "}
                  <span className="text-green-800 text-xl font-bold ">
                    ₦{product.productPrice}
                  </span>
                </h4>

                <div className="flex justify-between flex-wrap gap-5 items-center mt-5">
                  <button
                    onClick={(e) => {
                      console.log(e.target);
                      addToCart(product);
                    }}
                    className="flex relative z-20 gap-3 items-center text-[12px]  bg-black border border-green-900 p-2 py-3 px-3 rounded-full text-white font-bold "
                  >
                    Add to Cart <FaShoppingCart className="text-green-700" />
                  </button>
                  <button
                    onClick={() => {
                      removeFromCart(product);
                    }}
                    className=" flex relative z-20 gap-3 items-center text-[12px]  bg-black border border-green-900 p-2 py-3 px-3 rounded-full text-white font-bold "
                  >
                    Remove from Cart <FaShoppingCart className="text-green-700" />
                  </button>
                  <button className=" flex gap-3 my-2  items-center bg-black border border-green-900 p-2 px-3 rounded-full text-white py-3 font-bold text-[12px]">
                    Place Order <FaPhone className="text-green-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Files;
