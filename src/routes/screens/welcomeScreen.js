import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
//Screen
import WelcomePage from "../../pages/welcome";
import LoginPage from "../../pages/users/login";
import RegisterPage from "../../pages/users/register";

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
          headerTitle: () => (
            <View style={styles.header}>
              <Text style={styles.headerText}>Login</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{
          headerTitle: () => (
            <View style={styles.header}>
              <Text style={styles.headerText}>Register</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "rgb(68, 104, 176)",
    letterSpacing: 1,
  },
});
