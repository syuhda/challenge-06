import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import thunk from "redux-thunk";

// Create the store ==> Ini bagaikan databasenya, file postReducers bagaikan tabel2nya
export default configureStore({
  reducer: rootReducers,
  // kalo di vercel bakal berubah jadi "production"
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // It not necessary if your feature is not too complex, you can just comment this line if you don't need it
});
