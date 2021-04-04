import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";

//Screens pages
import { DrawerContent } from "./screens/drawerContent";
import MainScreen from "./screens/mainScreen";
import WelcomeScreen from "./screens/welcomeScreen";

const Drawer = createDrawerNavigator();

export default function Routes() {
  const login = useSelector((state) => state.IsLoadingToken);

  if (!login.isLoadingToken) {
    return (
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="Shop" component={MainScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
