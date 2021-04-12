import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screen
import Home from "../../pages/home";

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
    </Stack.Navigator>
  );
}
