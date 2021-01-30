import React from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import store from "../src/redux/store";

//Screens
import Home from "../screens/home";
import User from "../screens/user";
import About from "../screens/about";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function Routes() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
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
            <Tabs.Screen name="Home" component={Home} />
            <Tabs.Screen name="Users" component={User} />
            <Tabs.Screen name="About" component={About} />
          </Tabs.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
