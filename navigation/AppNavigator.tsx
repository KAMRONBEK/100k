import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/slices/user/user";
import About from "../screens/About";
import Login from "../screens/Auth/Login/Login";
import GetMoney from "../screens/GetMoney";
import History from "../screens/History";
import AddLoad from "../screens/Load/AddLoad";
import EditLoad from "../screens/Load/EditLoad";
import AddMail from "../screens/Mail/AddMail";
import MyCabinet from "../screens/MyCabinet";
import NoInternet from "../screens/NoInternet";
import Notifications from "../screens/Notifications";
import OnboardingScreen from "../screens/OnboardingScreen";
import District from "../screens/Regions/District";
import AddPassenger from "../screens/Taxi/AddPassenger";
import { routes } from "./routes";
import Regions from "../screens/Regions/Regions";
import EditPassenger from "../screens/Taxi/EditPassanger";
import { navigationRef } from "./NavigationService";
import TabStack from "./TabStack";
import AddTransport from "../screens/transport/AddTransport";
import SupportView from "../screens/Support/Support";
import EditMail from "../screens/Mail/EditMail";
import Kuriyer from "../screens/Kuriyer/Kuriyer";
import QuestionMail from "../components/QuestionMail";
import QuestionPassenger from "../components/QuestionPassanger";
import QuestionLoad from "../components/QuestionLoad";
import QuestionTransport from "../components/QuestionTransport";
import LoginProfile from "../screens/LogindPofile";
import Cabinet from "../screens/Cabinet";
import Code from "../screens/Auth/Login/Code";

const Stack = createStackNavigator();

const AppNavigator = () => {
  let token = useSelector(selectToken);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token && (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        <Stack.Screen name={routes.TAB_STACK} component={TabStack} />
        <Stack.Screen name={routes.LOGIN} component={Login} />
        <Stack.Screen name={routes.MY} component={MyCabinet} />
        <Stack.Screen name={routes.MONEY} component={GetMoney} />
        <Stack.Screen name={routes.ABOUT} component={About} />
        <Stack.Screen name={routes.HISTORY} component={History} />
        <Stack.Screen name={routes.NO_INTERNET} component={NoInternet} />
        <Stack.Screen name={routes.NOTIFICATIONS} component={Notifications} />
        <Stack.Screen name={routes.ADD_MAIL} component={AddMail} />
        <Stack.Screen name={routes.REGION} component={Regions} />
        <Stack.Screen name={routes.DISTRICT} component={District} />
        <Stack.Screen name={routes.ADD_PASSENGER} component={AddPassenger} />
        <Stack.Screen name={routes.EDIT_PASSENGER} component={EditPassenger} />
        <Stack.Screen name={routes.ADD_LOAD} component={AddLoad} />
        <Stack.Screen name={routes.ADD_TRANSPORT} component={AddTransport} />
        <Stack.Screen name={routes.EDIT_LOAD} component={EditLoad} />
        <Stack.Screen name={routes.ONBOARDING} component={OnboardingScreen} />
        <Stack.Screen name={routes.SUPPORT} component={SupportView} />
        <Stack.Screen name={routes.EDIT_MAIL} component={EditMail} />
        <Stack.Screen name={routes.COURIER} component={Kuriyer} />
        <Stack.Screen name={routes.QUESTIONMAIL} component={QuestionMail} />
        <Stack.Screen
          name={routes.QUESTIONPASSENGER}
          component={QuestionPassenger}
        />
        <Stack.Screen name={routes.QUESTIONLOAD} component={QuestionLoad} />
        <Stack.Screen
          name={routes.QUESTIONTRANSPORT}
          component={QuestionTransport}
        />
        <Stack.Screen name={routes.LOGINPROFILE} component={LoginProfile} />
        <Stack.Screen name={routes.CABINET_STACK} component={Cabinet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
