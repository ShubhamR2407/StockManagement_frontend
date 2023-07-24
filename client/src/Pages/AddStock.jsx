import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const AddStock = () => {
  const navigate = useNavigate();
  const profileData = useSelector(state => state.user.userData)
  const token = sessionStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [formData, setFormData] = useState({
    name: profileData.company? profileData.name: "",
    symbol: "",
    type: "",
    currentPrice: "",
    expiryDate: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/stock/save",
        {
          name: formData.name,
          symbol: formData.symbol,
          type: formData.type,
          currentPrice: formData.currentPrice,
          expDate: formData.expiryDate,
        },
        config
      )
      .then(() => {
        navigate("/dashboard");
        toast.success("New Stock Created", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Error Creating Stock:", error.message);
        toast.error("Error Creating Stock: " + error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="p-8 flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8 space-y-4">
          <h1 className="text-3xl font-bold mb-6">Add New Stock</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">
                Name:
              </label>
              {profileData.company ? (<input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly
                className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
              />) : (
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
              />
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">
                Symbol:
              </label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
                className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">
                Type:
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">
                Current Price:
              </label>
              <input
                type="number"
                name="currentPrice"
                value={formData.currentPrice}
                onChange={handleChange}
                required
                className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold text-lg mb-2">
                Expiry Date:
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="bg-gray-100 border-2 border-gray-300 p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Stock
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStock;
