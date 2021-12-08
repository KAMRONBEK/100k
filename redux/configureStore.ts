// import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import { compose, createStore, Store } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
let composeEnhancer = __DEV__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export let store = createStore(persistedReducer, composeEnhancer);
export let persistor = persistStore(store);
export type IRoot = ReturnType<typeof store.getState>;
