import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import Reactotron from "./ReactotronConfig";
import { compose, createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};
let createdEnhancer = Reactotron.createEnhancer();
const persistedReducer = persistReducer(persistConfig, reducers);

let composer = __DEV__ ? compose(createdEnhancer) : null;

export let store = createStore(persistedReducer, composer);
export let persistor = persistStore(store);
