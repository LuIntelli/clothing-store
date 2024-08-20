import React, { useState, useContext } from "react";
import {
  FaServicestack,
  FaBars,
  FaHome,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaInfoCircle,
  FaShoppingCart,
  FaTwitter,
} from "react-icons/fa";
import { CartContext } from "./Cart";

import { Link } from "react-router-dom";

const Header = () => {
  const cartt = useContext(CartContext);
  console.log(cartt);
  const [toggle, setToggle] = useState(false);

  return (
    <header className="fixed top-0 w-full z-30 flex justify-between border-b border-slate-800 bg-black text-white px-10 h-20 py-5 items-center">
      <Link to={"/"} className=" font-bold text-md md:text-2xl">
        New<span className=" text-green-700">-Tastment</span>
      </Link>
      {/* <div className="socials flex items-center gap-3">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaWhatsapp /></a>
        </div> */}
      <nav className="relative  md:px-20">
        <Link to={"/carts"} className="cart flex border cursor-pointer px-4 py-3 rounded-full border-green-900 items-center absolute md:top-0 -top-6 md:left-1 -left-24">
          <FaShoppingCart className=" text-slate-500" />{" "}
          <span className="val relative left-1 -top-2">
            { cartt && cartt.cartVal.length}
          </span>
        </Link>
        <button
          onClick={() => {
            setToggle((prev) => !prev);
          }}
          className=" absolute text-green-200 md:hidden inline-block -top-3 text-2xl right-0"
        >
          <FaBars />
        </button>

        <ul
          className={
            toggle == false
              ? " z-10 animate__animated animate__fadeInDown hidden md:flex md:flex-nowrap flex-wrap md:flex-row flex-col md:relative absolute right-0 top-16 md:top-0 md:right-0 md:w-full py-4  bg-black md:bg-transparent md:py-0 w-60 gap-10 items-center"
              : " animate__animated animate__fadeInDown flex md:flex-nowrap flex-wrap md:flex-row flex-col md:relative absolute -right-8 top-28 md:top-0 md:right-0 md:w-full py-10 rounded-lg  bg-black md:bg-transparent md:py-0 w-60 gap-10 items-center"
          }
        >
          <li>
            <Link
              to={"/"}
              className=" font-medium items-center text-sm flex gap-2"
            >
              Home <FaHome className=" text-green-700 text-sm" />
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className=" font-medium items-center text-sm flex gap-2"
            >
              About <FaInfoCircle className=" text-green-700 text-sm" />
            </Link>
          </li>

          <li>
            <Link
              to={"/upload"}
              className=" font-medium items-center text-sm flex gap-2"
            >
              Upload <FaPhone className=" text-green-700 text-sm" />
            </Link>
          </li>
          <li>
            <a
              to={"/"}
              className=" font-medium items-center text-sm flex gap-2"
            >
              Products <FaServicestack className=" text-green-700 text-sm" />
            </a>
          </li>
        </ul>
      </nav>
      <ul className=" absolute top-[72px] gap-4 border-t border-slate-800 flex justify-between items-center px-12  text-slate-200 py-5 w-full bg-slate-950 left-0">
        <div className="social flex gap-2 text-green-800 font-bold">
          <a href="">
            <FaFacebook />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaWhatsapp />
          </a>
          <a href="">
            <FaTwitter />
          </a>
        </div>
        <button className="bg-green-800 py-4 px-3 rounded-md relative md:right-20 text-sm">
          Make an order
        </button>
      </ul>
    </header>
  );
};

export default Header;
