import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

//Screens pages
import WelcomeScreen from "./screens/welcomeScreen";
import { DrawerContent } from "./screens/drawerContent";
import MapScreen from "./screens/mapScreen";

const Drawer = createDrawerNavigator();

export default function Routes() {
  const login = useSelector((state) => state.IsLoadingToken);

  if (!login.isLoadingToken) {
    //If token is empty then we display Welcome Page
    return (
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );
  } else {
    //If token is empty then we display Home page (Map)
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="Map" component={MapScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
