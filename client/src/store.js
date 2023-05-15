import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducer/RootReducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
const persistConfig = {
  key: "posteblogo",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});
export let persistor = persistStore(store);
