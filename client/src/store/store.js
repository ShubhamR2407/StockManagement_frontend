import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice"
import stockReducer from "./stockSlice"

const store = configureStore({
    reducer: {
        user : userReducer,
        stock : stockReducer
    }
})

export default store