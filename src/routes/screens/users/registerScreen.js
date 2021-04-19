import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens Page
import Header from "../shared/header";
import RegisterPage from "../../../pages/users/register";

const Stack = createStackNavigator();

export default function RegisterScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{
          headerTitle: () => (
            <Header navigation={navigation} title="Register" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
