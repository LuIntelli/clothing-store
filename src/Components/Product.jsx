import React, { useEffect, useState } from "react";
import one from "../assets/bgimg.jpg";
import { FaPhone, FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Product = () => {
    const [product, setProduct] = useState();

    const {id: productId } = useParams();
    console.log(productId);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const docRef = doc(db, "products", productId);
                const docSnap = await getDoc(docRef);


                if(docSnap.exists()) {
                    setProduct(docSnap.data());
                    console.log(docSnap.data());
                } else {
                    console.log("No such document!")
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getProduct();
    }, [productId]);

  return (
   <>
        { product ? (
             <div className=" flex px-10  justify-around w-full md:flex-nowrap flex-wrap relative md:w-[1000px] gap-10  py-10 mx-auto">
             <div className="image md:w-[1000px] lg:w-[1000px] p-0.5 bg-slate-400 rounded-xl">
               <img src={product.url} className=" rounded-xl w-full h-full" />
             </div>
             <div className=" shadow-xl shadow-slate-800 p-2 px-10 rounded-lg des w-full ">
               <p className=" text-white border-b border-green-950 py-4">
                 <span className="font-bold my-3 inline-block">Description</span>
                 <br />
                 <span className="px-3 inline-block text-sm">
                  {product.description}
                 </span>
               </p>
               <p className="price border-b border-green-950 flex justify-between items-center text-white">
                 <span className="font-bold my-3 inline-block">Price</span>
                 <br />
                 <span className="text-green-300 text-sm bg-green-900 py-3 my-2 rounded-md px-3 font-bold">
                 ₦{product.productPrice}
                 </span>
               </p>
               <p className="price text-white flex justify-between border-b border-green-950 py-4">
                 <span className="font-bold my-3 inline-block text-sm">Instock</span>
                 <span className=" text-center text-green-500 py-3  rounded-md px-3 text-sm font-bold">
                 Available
                 </span>
               </p>
               <p className="stock text-white flex justify-between gap-5 border-b border-green-950 py-4">
                 <span className="font-bold my-3 inline-block text-sm">Place Imediate Order</span>
                 <br />
                 <a href="tel:+2347058032078" className="text-white flex gap-1 items-center border border-slate-800 shadow-sm shadow-green-900 py-3  rounded-md px-3 text-sm font-bold">
                  Call Now <FaPhone className=" relative -top-0.5 text-green-500" />
                 </a>
               </p>
               <p className="stock text-white flex justify-between gap-5  py-4">
                 <a href="tel:+2347058032078" className="text-white flex gap-1 items-center border border-slate-800 shadow-sm shadow-red-900 py-3  rounded-md px-3 text-sm font-bold">
                  Add To Cart<FaShoppingCart className=" text-red-500 relative -top-0.5" />
                 </a>
               </p>
               
             </div>
           </div>
        ) : (
            <h2>
                Loading ...
            </h2>
        )}
   </>
  );
};

export default Product;
