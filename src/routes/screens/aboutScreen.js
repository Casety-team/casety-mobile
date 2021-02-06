import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screen
import Header from "./shared/header";
import AboutPage from "../../pages/about";

const Stack = createStackNavigator();

export default function About({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={AboutPage}
        options={{
          headerTitle: () => <Header navigation={navigation} title="About" />,
        }}
      />
    </Stack.Navigator>
  );
}
