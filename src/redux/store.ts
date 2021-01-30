import { createStore } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootReducer from "./rootReducer";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
