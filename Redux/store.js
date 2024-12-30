import { configureStore } from '@reduxjs/toolkit'
import todosReducer from "../Redux/Slices/TodosSlice";
import userReducer from "../Redux/Slices/UserSlice";


export const store = configureStore({
  reducer: {
    todosReducer:todosReducer,
    userReducer:userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable check
    }),
})