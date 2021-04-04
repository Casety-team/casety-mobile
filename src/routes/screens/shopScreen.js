import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screen
import Header from "./shared/header";
import ShopPage from "../../pages/shop";

const Stack = createStackNavigator();

export default function Shop({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Shop"
        component={ShopPage}
        options={{
          headerTitle: () => <Header navigation={navigation} title="Shop" />,
        }}
      />
    </Stack.Navigator>
  );
}
