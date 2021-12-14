// import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import { compose, createStore, Store } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "./ReactotronConfig";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
/* React Native Debugger */
// let composeEnhancer = compose();
// if (__DEV__) {
//     composeEnhancer =
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__();
// }

/*Reactotron*/
let middlewares = [];
if (__DEV__) {
  let reactoronMiddleware = Reactotron.createEnhancer!();
  middlewares.push(reactoronMiddleware);
}

export let store = createStore(persistedReducer, compose(...middlewares));
export let persistor = persistStore(store);
export type IRoot = ReturnType<typeof store.getState>;
