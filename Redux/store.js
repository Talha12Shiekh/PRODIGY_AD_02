import { configureStore } from '@reduxjs/toolkit'
import todosReducer from "../Redux/Slices/TodosSlice";


export const store = configureStore({
  reducer: {
    todosReducer:todosReducer
  },
})