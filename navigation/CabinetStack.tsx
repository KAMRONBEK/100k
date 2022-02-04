import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../redux/slices/user/user";
import Login from "../screens/Auth/Login/Login";
import MyCabinet from "../screens/MyCabinet";
import { routes } from "./routes";
import reactotron from "reactotron-react-native";
import Code from "../screens/Auth/Login/Code";
import { MyCabinetStack } from "./MyCabinetStack";
import LoginProfile from "../screens/LogindPofile";

let Stack = createNativeStackNavigator();

export const CabinetStack = () => {
  let token = useSelector(selectToken);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token && (
        <Stack.Screen name={routes.LOGINPROFILE} component={LoginProfile} />
      )}
      {!token && <Stack.Screen name={routes.LOGIN} component={Login} />}
      {!token && <Stack.Screen name={routes.CODE} component={Code} />}
      {!!token && (
        <Stack.Screen
          name={routes.MY_CABINET_STACK}
          component={MyCabinetStack}
        />
      )}
    </Stack.Navigator>
  );
};
