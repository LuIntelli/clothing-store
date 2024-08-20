import { useState } from "react";

import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Cart from "./Components/Cart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <ToastContainer />
      <section className="header">
        <Header />
      </section>
      <main className="add mt-10 mb-2.5 relative top-2 h-full  py-20 border-t">
        <div className=" w-full absolute h-full bg-black bg-opacity-[0.7] top-0 left-0"></div>
        <Outlet />
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
