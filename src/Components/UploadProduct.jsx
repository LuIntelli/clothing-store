import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaImage, FaPlus, FaTshirt } from "react-icons/fa";
import { motion } from "framer-motion";
import { db, storage } from "../firebase/firebaseConfig";
import ProgressBar from "./ProgressBar";
import useStorage from "../Hooks/UseStorage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router";

const UploadProduct = () => {
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [url, setUrl] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [stock, setStock] = useState();
  const [done, setDone] = useState(false);
  let allow = ["image/png", "image/jpeg"];

  const navigate = useNavigate();

  const handleUpload = () => {
    //     // reference where the files should be saved

    if (confirm("Are you sure this is the image to upload")) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadImage = uploadBytesResumable(storageRef, file);
      uploadImage.on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          // setProgress(percentage);
          console.log(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          // When the file is fully uploaded
          const url = await getDownloadURL(uploadImage.snapshot.ref);
          console.log(url);
          setUrl(url);
          if (url) {
            setDone(true);
          } else {
            console.log("loading...");
          }
          toast.success("Product Image successfully uploaded to the database");
        }
      );
    } else {
      toast.success("Product Image not uploaded...");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productCategory && productName && productPrice && url && stock) {
      const dbRef = collection(db, "products");
      addDoc(dbRef, {
        productName,
        productCategory,
        productPrice,
        createdAt: serverTimestamp(),
        stock,
        url,
      });
      toast.success("Product successfully added to the database");
      setProductCategory("");
      setProductName("");
      setProductPrice(0);
      setProductDescription("");
      setUrl("");
      navigate("/");
    } else {
      toast.error("no field should be left out");
    }
  };

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && allow.includes(selected.type)) {
      setFile(selected);
      toast.success("Product image successfuly selected");
      setError("");
      console.log("Done...");
    } else {
      setFile(null);
      setError("Please selecte an image file (png or jpeg");
      toast.error(error);
    }
    console.log(selected);
  };
  return (
    <div className=" md:w-3/4 w-full relative z-10 px-10  mx-auto py-10">
      <h2 className="text-center flex justify-center gap-2 items-center text-3xl text-slate-300">
        Add New Product <FaTshirt className=" text-green-700" />
      </h2>
      <motion.form
        animate={{
          x: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        onSubmit={(e) => handleSubmit(e)}
        action="#"
        className=""
      >
        <div className="flex md:flex-nowrap flex-wrap gap-5 my-5">
          <div className="name w-full md:w-3/4">
            <label
              htmlFor="name"
              className="my-2  items-center flex gap-2 text-slate-200"
            >
              Product Name <FaTshirt className=" text-green-700" />
            </label>
            <input
              type="text"
              name="name"
              className="border text-sm border-slate-500 outline-none px-5 py-5 rounded-lg w-full"
              placeholder="product name"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </div>
          <div className="category w-full md:w-3/4">
            <label
              htmlFor="name"
              className="my-2 items-center flex gap-2 text-slate-200"
            >
              Category <FaTshirt className=" text-green-700" />
            </label>
            <input
              type="text"
              name="category"
              placeholder="category"
              onChange={(e) => setProductCategory(e.target.value)}
              value={productCategory}
              className="border text-sm border-slate-500 outline-none px-5 py-5 rounded-lg w-full"
            />
          </div>
        </div>
        <div className="flex md:flex-nowrap  flex-wrap gap-5 my-1">
          <div className="description w-full md:w-3/4">
            <label
              htmlFor="name"
              className="my-2  items-center flex gap-2 text-slate-200"
            >
              Product Description <FaTshirt className=" text-green-700" />
            </label>
            <input
              type="text"
              name="description"
              className="border text-sm border-slate-500 outline-none px-5 py-5 rounded-lg w-full md:w-3/5"
              placeholder="product name"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
          </div>
          
        </div>
        <div className="flex md:flex-nowrap flex-wrap gap-2 md:gap-5 my-2 items-center">
          <div className="price w-full md:w-3/4">
            <label htmlFor="price" className="my-2 block text-slate-200">
              Product Price <span className=" text-green-700">( ₦ )</span>
            </label>
            <input
              type="number"
              name="price"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              className="border text-sm border-slate-500 outline-none px-5 py-5 rounded-lg w-full"
              placeholder="product price ( in Naira )"
            />
          </div>
          <div className="instock flex  items-center relative md:top-5 px-2 gap-5 w-full md:w-3/4">
            <div className="instock flex items-center gap-2">
              <label
                htmlFor="instock"
                className=" cursor-pointer flex my-2 items-center gap-1 border p-2 px-3 border-slate-800 shadow-sm rounded-lg text-sm text-slate-200"
              >
                Instock <FaTshirt className=" text-green-700" />
              </label>
              <input
                type="radio"
                name="stock"
                className=" cursor-pointer text-sm"
                id="instock"
                onChange={(e) => setStock(e.target.value)}
                value={"true"}
              />
            </div>
            <div className="outstock flex md:flex-nowrap flex-wrap items-center gap-2">
              <label
                htmlFor="outofstock"
                className="cursor-pointer flex my-2 gap-1 border p-2 px-3 border-slate-800 rounded-lg text-sm items-center text-slate-200"
              >
                out of stock <FaTshirt className=" text-green-700" />
              </label>
              <input
                type="radio"
                name="stock"
                id="outofstock"
                value={"false"}
                onChange={(e) => setStock(e.target.value)}
                className="cursor-pointer text-sm"
              />
            </div>
          </div>
        </div>

        <div className="image w-full md:w-full flex md:my-5 flex-wrap md:flex-nowrap items-center gap-2 md:gap-10">
          <input
            type="text"
            value={file.name}
            onChange={(e) => changeHandler(e)}
            placeholder="product url"
            className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"
            id="image"
          />
          <input
            type="file"
            name="image"
            className=" py-5 file:bg-green-800 w-full cursor-pointer file:outline-none file:border-none file:px-5 file:rounded-lg text-white  file:py-2 file:text-sm file:text-white  inline-block mx-1"
            id="file"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        {!done ? (
          <button
            onClick={(e) => handleUpload(e)}
            className=" bg-green-800 active:bg-black active:p-4 active:transition-all 0.3s p-3 flex gap-2 items-center text-sm  mt-4 text-white rounded-full px-4"
          >
            <FaImage />
            Upload Product Image
          </button>
        ) : (
          <button
            onClick={(e) => handleSubmit(e)}
            className=" bg-green-800 active:bg-black active:p-4 active:transition-all 0.3s p-3 flex gap-2 items-center text-sm  mt-4 text-white rounded-full px-4"
          >
            <FaPlus />
            Add Product
          </button>
        )}
      </motion.form>
      {/* <div className="progressbar">
        {
          file && <ProgressBar file={file} setFile={setFile} />
        }
      </div> */}
    </div>
  );
};

export default UploadProduct;
