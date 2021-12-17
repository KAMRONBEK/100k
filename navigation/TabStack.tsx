import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Cabinet from "../screens/Cabinet";
import Load from "../screens/Load/Load";
import Mail from "../screens/Mail/Mail";
import Transport from "../screens/Transport";
import { Image, Text, View } from "react-native";
import { CabinetStack } from "./CabinetStack";
import Passenger from "../screens/Taxi/Passenger";
import { routes } from "./routes";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 72,
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Image
                source={require("../assets/boxOne.png")}
                resizeMode="contain"
                style={{
                  width: 29.57,
                  height: 29.22,
                  tintColor: focused ? "#FFD347" : "#C7C7C7",
                }}
              />
              <Text
                style={{
                  color: focused ? "#FFD347" : "#C7C7C7",
                  fontSize: 12,
                  fontWeight: "500",
                  marginTop: 5.78,
                  marginBottom: 26,
                }}
              >
                pochta
              </Text>
            </View>
          ),
        }}
        name={routes.MAIL}
        component={Mail}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Image
                source={require("../assets/car.png")}
                resizeMode="contain"
                style={{
                  width: 31.57,
                  height: 29.22,
                  tintColor: focused ? "#FFD347" : "#C7C7C7",
                }}
              />
              <Text
                style={{
                  color: focused ? "#FFD347" : "#C7C7C7",
                  fontSize: 12,
                  fontWeight: "500",
                  marginTop: 5.78,
                  marginBottom: 26,
                }}
              >
                yo’lovchi
              </Text>
            </View>
          ),
        }}
        name={routes.PASSENGER}
        component={Passenger}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Image
                source={require("../assets/load.png")}
                resizeMode="contain"
                style={{
                  width: 29.57,
                  height: 29.22,
                  tintColor: focused ? "#FFD347" : "#C7C7C7",
                }}
              />
              <Text
                style={{
                  color: focused ? "#FFD347" : "#C7C7C7",
                  fontSize: 12,
                  fontWeight: "500",
                  marginTop: 5.78,
                  marginBottom: 26,
                }}
              >
                yuk
              </Text>
            </View>
          ),
        }}
        name={routes.LOAD}
        component={Load}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Image
                source={require("../assets/transport.png")}
                resizeMode="contain"
                style={{
                  width: 29.57,
                  height: 29.22,
                  tintColor: focused ? "#FFD347" : "#C7C7C7",
                }}
              />
              <Text
                style={{
                  color: focused ? "#FFD347" : "#C7C7C7",
                  fontSize: 12,
                  fontWeight: "500",
                  marginTop: 5.78,
                  marginBottom: 26,
                }}
              >
                transport
              </Text>
            </View>
          ),
        }}
        name={routes.TRANSPORT}
        component={Transport}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Image
                source={require("../assets/userOne.png")}
                resizeMode="contain"
                style={{
                  width: 29.57,
                  height: 29.22,
                  tintColor: focused ? "#FFD347" : "#C7C7C7",
                }}
              />
              <Text
                style={{
                  color: focused ? "#FFD347" : "#C7C7C7",
                  fontSize: 12,
                  fontWeight: "500",
                  marginTop: 5.78,
                  marginBottom: 26,
                }}
              >
                kabinet
              </Text>
            </View>
          ),
        }}
        name={routes.CABINET_STACK}
        component={CabinetStack}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
