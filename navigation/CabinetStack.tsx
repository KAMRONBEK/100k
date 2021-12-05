import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../redux/slices/user";
import Login from "../screens/Auth/Login/Login";
import MyCabinet from "../screens/MyCabinet";
import { routes } from "./routes";
import reactotron from "reactotron-react-native";
import Code from "../screens/Auth/Login/Code";

let Stack = createNativeStackNavigator();

export const CabinetStack = () => {
    let token = useSelector(selectToken);
    console.log({ token }, "token");
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!token && <Stack.Screen name={routes.LOGIN} component={Login} />}
            {!token && <Stack.Screen name={routes.CODE} component={Code} />}
            {!!token && (
                <Stack.Screen name={routes.MY_CABINET} component={MyCabinet} />
            )}
        </Stack.Navigator>
    );
};
