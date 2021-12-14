import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import TabStack from "./TabStack";
import Login from "../screens/Auth/Login/Login";
import MyCabinet from "../screens/MyCabinet";
import Private from "../screens/Private";
import GetMoney from "../screens/GetMoney";
import About from "../screens/About";
import History from "../screens/History";
import NoInternet from "../screens/NoInternet";
import Notifications from "../screens/Notifications";
import AddMail from "../screens/Mail/AddMail";
import District from "../screens/Regions/District";
import AddPassenger from "../screens/Taxi/AddPassenger";
import AddLoad from "../screens/AddLoad";
import AddTransport from "../screens/AddTransport";
import Kuriyer from "../screens/Kuriyer";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/slices/user/user";
import { routes } from "./routes";
import Regions from "../screens/Regions/Regions";
import { navigationRef } from "./NavigationService";
import EditPassenger from "../screens/Taxi/EditPassanger";

const Stack = createStackNavigator();

const AppNavigator = () => {
    let token = useSelector(selectToken);
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!token && (
                    <Stack.Screen
                        name="OnboardingScreen"
                        component={OnboardingScreen}
                    />
                )}
                <Stack.Screen name={routes.TAB_STACK} component={TabStack} />
                <Stack.Screen name={routes.LOGIN} component={Login} />
                <Stack.Screen name={routes.MY} component={MyCabinet} />
                <Stack.Screen name={routes.MONEY} component={GetMoney} />
                <Stack.Screen name={routes.ABOUT} component={About} />
                <Stack.Screen name={routes.HISTORY} component={History} />
                <Stack.Screen
                    name={routes.NO_INTERNET}
                    component={NoInternet}
                />
                <Stack.Screen
                    name={routes.NOTIFICATIONS}
                    component={Notifications}
                />
                <Stack.Screen name={routes.ADD_MAIL} component={AddMail} />
                <Stack.Screen name={routes.REGION} component={Regions} />
                <Stack.Screen name={routes.DISTRICT} component={District} />
                <Stack.Screen
                    name={routes.ADD_PASSENGER}
                    component={AddPassenger}
                />
                <Stack.Screen
                    name={routes.EDIT_PASSENGER}
                    component={EditPassenger}
                />
                <Stack.Screen name={routes.ADD_LOAD} component={AddLoad} />
                <Stack.Screen
                    name={routes.ADD_TRANSPORT}
                    component={AddTransport}
                />
                {/*<Stack.Screen name="MyCabinetScreen" component={MyCabinet}/>*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
