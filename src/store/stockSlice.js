import { configureStore, createSlice } from "@reduxjs/toolkit";

// stock이라는 state
let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

export default stock;
