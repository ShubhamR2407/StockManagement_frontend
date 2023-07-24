import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStocks, sellStock } from "../store/stockSlice";

const MyStocks = () => {
  const profileData = useSelector((state) => state.user.userData);
  const stocks = useSelector((state) => state.stock.userStocks);
  const dispatch = useDispatch();

  const handleSellStock = (stockId) => {
    const userId = profileData.userId;
    dispatch(sellStock({stockId, userId}))
    window.location.reload()
  }

  useEffect(() => {
    dispatch(fetchUserStocks(profileData.userId));
  }, [dispatch, profileData.userId]);

  return (
    <div className="text-center">
      <Navbar />
      <h1 className="text-3xl font-bold my-4">My Stocks</h1>
      <div className="mx-auto w-2/3">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Current Price</th>
              <th className="px-4 py-2">Expiration Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.stockId} className="rounded-lg m-2">
                <td className="border px-4 py-2">{stock.name}</td>
                <td className="border px-4 py-2">{stock.symbol}</td>
                <td className="border px-4 py-2">{stock.type}</td>
                <td className="border px-4 py-2">{stock.currentPrice}</td>
                <td className="border px-4 py-2">{stock.expDate.substring(0,10)}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSellStock(stock.stockId)}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyStocks;
