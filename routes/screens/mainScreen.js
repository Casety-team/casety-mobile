import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//Screens
import HomePage from "../../pages/home";
import LoginScreen from "./loginScreen";

const Tab = createBottomTabNavigator();
export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === "Home") {
            icon = focused ? "home" : "home-outline";
          } else if (route.name === "Login") {
            icon = focused ? "ios-people-sharp" : "ios-people-outline";
          }
          return <Ionicons name={icon} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: "rgb(68, 104, 176)",
        inactiveBackgroundColor: "rgb(68, 104, 176)",
        activeTintColor: "white",
        inactiveTintColor: "white",
        tabStyle: {
          width: 100,
        },
        style: {
          height: 90,
          backgroundColor: "rgb(68, 104, 176)",
        },
      }}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}
