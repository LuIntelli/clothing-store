import  React, { useEffect, useState } from "react";
import {  FaHome, FaPhone, FaInfoCircle,   } from  "react-icons/fa";

const Footer = () => {
    const [val, setval] = useState("")

   

  const year = new Date().getFullYear();
  return (
    <div className=" footer relative bg-black w-full z-10 p-10">
      <div className="flex justify-between md:flex-nowrap flex-wrap gap-4  text-white">
        <div className="company">
          <h2 className="text-xl md:text-2xl font-bold my-3">
            New<span className="text-green-700">-Testament</span>
          </h2>
          <p className=" my-3 text-sm">Reema Properties and Accommodation Agent
           <br />
          </p>
          <a
            href="mailto:reemainvestmentsandtechnologies@gmail.com"
            className=" text-slate-200 font-medium bg-green-500 rounded-md border border-slate-900 p-2 mt-1 shadow-lg py-2 px-4 text-center inline-block text-sm break-words"
          >
            Email Us
          </a>
        </div>
        <div className="company w-3/4 flex  flex-col md:items-center">
          <h2 className="text-xl md:text-2xl font-bold my-3">Links</h2>
          <ul className=" flex flex-col gap-4 text-sm">
            <li>
              <a href="/" className=" flex items-center gap-2">Home <FaHome className=" text-sm text-slate-400 relative top-0 " /></a>
            </li>
            <li>
              <a href="#about" className=" flex  items-center gap-2">About <FaInfoCircle className=" text-slate-400 relative top-0 text-sm" /></a>
            </li>
            <li>
              <a href="#properties">
                
              </a>
            </li>
          </ul>
        </div>
        <div className="company">
          <h2 className="text-3xl font-bold mt-3">
            Contact-<span className="text-slate-400 ">Us</span>
          </h2>
          <p className="my-3 text-sm text-slate-200">
          New Testament || Dealers in Quality clothes   || Dealers in Quality Shoes  
            <br />
            For more details, call
            <br />
            <a href="tel:+2347033833383" className=" text-green-500 bg-slate-800 px-3 rounded-md font-medium border border-slate-900 p-2 mt-1 shadow-lg inline-block text-sm mt-5">New-Testament-Service Provider</a>
          </p>
        </div>
      </div>
      <div className="copy text-center text-slate-300 text-sm border-t mt-2 pt-3 border-slate-800">Copyright &copy; New Testament {year}</div>

    </div>
  );
};
export default Footer