import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens Page
import Home from "../../pages/home";
import ProfilePage from "../../pages/users/profile";
import ShopPage from "../../pages/shop";

const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Shop"
        component={ShopPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
