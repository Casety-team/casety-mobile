import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens Page
import Header from "../shared/header";
import LoginPage from "../../../pages/users/login/";

const Stack = createStackNavigator();

export default function LoginScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerTitle: () => <Header navigation={navigation} title="Login" />,
        }}
      />
    </Stack.Navigator>
  );
}
