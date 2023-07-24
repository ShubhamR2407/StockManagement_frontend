import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStockState = {
  stocks: [],
  userStocks: [],
};

const token = sessionStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const fetchUserStocks = createAsyncThunk(
  "stock/fetchUserStocksByUserId",
  async (userId) => {
    const { data } = await axios.get(`user/stocks/${userId}`, config);

    return data;
  }
);

export const fetchStocksData = createAsyncThunk(
  "stock/fetchAllStocks",
  async () => {
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await axios.get("/stock/stocks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      throw error;
    }
  }
);

export const buyStock = createAsyncThunk(
  "stock/buystock",
  async ({ stockId, userId }) => {
    try {
      const { data } = await axios.post(
        "/user/buy",
        {}, // Empty object as the request payload, modify this as needed
        {
          params: {
            userId,
            stockId,
          },
          ...config, // Include any additional configurations here
        }
      );
      return data;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      throw error;
    }
  }
);

export const removeStock = createAsyncThunk(
  "stock/removeStock",
  async (stockId) => {
    try {
      const { data } = await axios.delete(`/stock/${stockId}`, config);

      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const sellStock = createAsyncThunk(
  "stock/sellStock",
  async ({ stockId, userId }) => {
    console.log(userId);
    try {
      await axios.delete("/user/sell", {
        params: {
          stockId,
          userId,
        },
        ...config,
      });
      return stockId;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: initialStockState,
  extraReducers: (builder) => {
    builder.addCase(fetchStocksData.fulfilled, (state, action) => {
      state.stocks = action.payload;
    }),
      builder.addCase(removeStock.fulfilled, (state, action) => {
        const removedStockId = action.payload;
        state.stocks = state.stocks.filter(
          (stock) => stock.stockId !== removedStockId
        );
      }),
      builder.addCase(fetchUserStocks.fulfilled, (state, action) => {
        state.userStocks = action.payload;
      }),
      builder.addCase(buyStock.fulfilled, (state, action) => {
        const newStock = action.payload;
        state.userStocks.push(newStock);
        state.stocks = state.stocks.filter(
          (stock) => stock.stockId !== newStock.stockId
        );
      }),
      builder.addCase(sellStock.fulfilled, (state, action) => {
        const stockId = action.payload
        const oldStocks = [...state.userStocks];
        const filteredStocks = oldStocks.filter(stock => {
          stock.stockId !== stockId
        })
        state.userStocks = filteredStocks
      });
  },
});

export const stockActions = stockSlice.actions;

export default stockSlice.reducer;
