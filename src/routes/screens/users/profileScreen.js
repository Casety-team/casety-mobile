import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screen
import Header from "../shared/header";
import ProfilePage from "../../../pages/users/profile";

const Stack = createStackNavigator();

export default function ProfileScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerTitle: () => <Header navigation={navigation} title="Profile" />,
        }}
      />
    </Stack.Navigator>
  );
}
