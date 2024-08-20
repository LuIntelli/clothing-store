import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

import App from "./App.jsx";
import About from "./Pages/About.jsx";
import "./index.css";
import AddProduct from "./Pages/AddProduct.jsx";
import Body from "./Components/Body.jsx";
import Product from "./Components/Product.jsx";
import Cart from "./Pages/Cart.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Body />} index={true}></Route>
      <Route path="/about" element={<About />} ></Route>
      <Route path="/upload" element={<AddProduct />} ></Route>
      <Route path="/carts" element={<Cart />} ></Route>
      <Route path="/product/:id" element={<Product />} ></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode>
);
