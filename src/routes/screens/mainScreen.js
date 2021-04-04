import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//Screens
import Home from "../../pages/home";
import Shop from "./shopScreen";
import ProfileScreen from "./users/profileScreen";

const Tab = createBottomTabNavigator();
export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === "Map") {
            icon = focused ? "map" : "map-outline";
          } else if (route.name === "Shop") {
            icon = focused ? "ios-cart" : "cart-outline";
          } else if (route.name === "Profile") {
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
      <Tab.Screen name="Map" component={Home} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
