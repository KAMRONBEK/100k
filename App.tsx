import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/configureStore";
import AppNavigator from "./navigation/AppNavigator";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";

const App = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppNavigator />
                </PersistGate>
            </Provider>
            <FlashMessage position="top" />
        </SafeAreaView>
    );
};

export default App;
