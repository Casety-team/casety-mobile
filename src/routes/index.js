import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

//Screens pages
import { DrawerContent } from "./screens/drawerContent";
import MainScreen from "./screens/mainScreen";
import WelcomeScreen from "./screens/welcomeScreen";

const Drawer = createDrawerNavigator();

export default function Routes() {
  const [users, setUsers] = useState(false);

  if (users == true) {
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
