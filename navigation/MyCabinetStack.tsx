import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Kuriyer from "../screens/Kuriyer/Kuriyer";
import MyCabinet from "../screens/MyCabinet";
import Private from "../screens/Settings/Private";
import { routes } from "./routes";

let Stack = createNativeStackNavigator();

export const MyCabinetStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routes.MY_CABINET} component={MyCabinet} />
            <Stack.Screen name={routes.PRIVATE} component={Private} />
            <Stack.Screen name={routes.COURIER} component={Kuriyer} />
        </Stack.Navigator>
    );
};
