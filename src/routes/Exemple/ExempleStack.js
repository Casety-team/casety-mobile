import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../../pages/users/register";

const Stack = createStackNavigator();

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default UserStack;
