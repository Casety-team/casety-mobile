import React from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import store from "../src/redux/store";
import { Ionicons } from "@expo/vector-icons";

// //Screens
import HomePage from "../screens/home";
import LoginPage from "../screens/users/login";
import RegisterPage from "../screens/users/register";

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//Tabs
function HomeScreen() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let icon;
              if (route.name === "Home") {
                icon = focused ? "home" : "home-outline";
              } else if (route.name === "Users") {
                icon = focused ? "ios-people-sharp" : "ios-people-outline";
              } else if (route.name === "About") {
                icon = focused ? "chatbubbles-sharp" : "chatbubbles-outline";
              }
              return <Ionicons name={icon} size={32} color={color} />;
            },
          })}
        >
          <Tabs.Screen name="Home" component={HomePage} />
        </Tabs.Navigator>
      </SafeAreaView>
    </Provider>
  );
}

//User (Login)
function UserScreen() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let icon;
              if (route.name === "Register") {
                icon = focused ? "caret-up" : "documents-outline";
              } else if (route.name === "Login") {
                icon = focused ? "caret-up" : "ios-people-outline";
              }
              return <Ionicons name={icon} size={32} color={color} />;
            },
          })}
        >
          <Tabs.Screen name="Register" component={RegisterPage} />
          <Tabs.Screen name="Login" component={LoginPage} />
        </Tabs.Navigator>
      </SafeAreaView>
    </Provider>
  );
}

export default function routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login / Register" component={UserScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
