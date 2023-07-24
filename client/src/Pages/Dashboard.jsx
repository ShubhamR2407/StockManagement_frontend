import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyStock,
  fetchStocksData,
  fetchUserStocks,
  removeStock,
} from "../store/stockSlice";
import Navbar from "../Components/Navbar";
import axios from "axios";

const Dashboard = () => {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.user.userData);
  const userId = profileData.userId;
  const [stocksNotInUserStocks, setStocksNotInUserStocks] = useState([]);

  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        const allStocksResponse = await axios.get("/stock/stocks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allStocks = allStocksResponse.data;

        const userStocksResponse = await axios.get(`user/stocks/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userStocks = userStocksResponse.data;

        // Calculate the filtered stocks (allStocks - userStocks)
        const filteredStocks = allStocks.filter(
          (stock) => !userStocks.some((userStock) => userStock.stockId === stock.stockId)
        );

        // Update the state with filtered stocks
        setStocksNotInUserStocks(filteredStocks);

        console.log({ allStocks, userStocks });
      } catch (error) {
        console.error("Error fetching stocks data:", error);
      }
    };

    // Fetch user stocks data
    if (userId) {
      dispatch(fetchUserStocks(userId));
    }

    // Fetch all stocks data
    fetchStocksData();
  }, [userId, token, dispatch]);



  const handleBuy = (stockId) => {
    dispatch(buyStock({ stockId, userId }));
    window.location.reload();
  };
  const handleRemove = (id) => {
    const confirmed = window.confirm(
      "Are you sure, you want to remove this stock?"
    );
    if (!confirmed) {
      return;
    }
    dispatch(removeStock(id))
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />

      <main className="container mx-auto p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Stocks</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {stocksNotInUserStocks.map((stock) => (
            <li
              key={stock.stockId}
              className="bg-white shadow rounded p-6 border"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {stock.name}
                  </h2>
                </div>
                <div className="text-right mb-4">
                  <p className="text-base text-blue-400 font-semibold">
                    Symbol: {stock.symbol}
                  </p>
                  <p className="text-base text-blue-400 font-semibold">
                    Price: ${stock.currentPrice}
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-between text-sm text-gray-600">
                <p>Type: {stock.type}</p>
                <p>Expiration Date: {stock.expDate.substring(0, 10)}</p>
              </div>
              <div className="flex justify-between">
                {!profileData.company && <button
                  onClick={() => handleBuy(stock.stockId)}
                  className="bg-blue-500 text-white px-4 py-2 mt-6 rounded"
                >
                  Buy
                </button>}
                {profileData.admin && (
                  <button
                    onClick={() => handleRemove(stock.stockId)}
                    className="bg-red-500 text-white px-4 py-2 mt-6 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;
