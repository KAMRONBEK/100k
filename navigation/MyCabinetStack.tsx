import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import MyCabinet from "../screens/MyCabinet";
import Private from "../screens/Private";
import { routes } from "./routes";

let Stack = createNativeStackNavigator();

export const MyCabinetStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routes.MY_CABINET} component={MyCabinet} />
            <Stack.Screen name={routes.PRIVATE} component={Private} />
        </Stack.Navigator>
    );
};
