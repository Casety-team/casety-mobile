import React from "react";
import Routes from "./src/routes";
import Store from "./store";
import { Provider } from "react-redux";

import { View, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import LogoPictures from "./assets/dark_logo.png";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    Helvetica: require("./assets/fonts/Helvetica.ttf"),
    "Helvetica-Light": require("./assets/fonts/Helvetica-Light.ttf"),
  });

  if (fontsLoaded) {
    return (
      <Provider store={Store}>
        <Routes />
      </Provider>
    );
  } else {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Image style={styles.logo} source={LogoPictures} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F5FA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  horizontal: {
    justifyContent: "space-around",
    padding: 10,
  },
  logo: {
    marginTop: "-30%",
    width: "50%",
    height: "31%",
  },
});
