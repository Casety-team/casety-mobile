import React from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

import { useFonts } from "expo-font";

import Routes from "./routes";
import LogoPictures from "./assets/logo.png";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
  });

  if (fontsLoaded) {
    return <Routes />;
  } else {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Image style={styles.logo} source={LogoPictures} />
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  horizontal: {
    justifyContent: "space-around",
    padding: 10,
  },
  logo: {
    marginTop: "10%",
    marginBottom: 25,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
});
