import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens page
import WelcomePage from "../../pages/welcome/welcome";
import LoginPage from "../../pages/users/login";
import RegisterPage from "../../pages/users/register";
import PrivacyPage from "../../pages/privacy/privacy";

const Stack = createStackNavigator();

export default function WelcomeScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
