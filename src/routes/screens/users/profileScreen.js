import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens Page
import Header from "../shared/header";
import ProfilePage from "../../../pages/shop";

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
