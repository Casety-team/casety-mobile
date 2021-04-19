import React from "react";
import Routes from "./src/routes";
import Store from "./store";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { View, Image, StyleSheet } from "react-native";
import LogoPictures from "./assets/app/light_logo.png";

export default function App() {
  //Load font familly for app
  let [fontsLoaded] = useFonts({
    "Montserrat-Light": require("./assets/app/fonts/Montserrat-Light.ttf"),
    Helvetica: require("./assets/app/fonts/Helvetica.ttf"),
    "Helvetica-Light": require("./assets/app/fonts/Helvetica-Light.ttf"),
  });

  if (fontsLoaded) {
    //Redirect Welcome page
    return (
      <Provider store={Store}>
        <Routes />
      </Provider>
    );
  } else {
    //Redirect Loading page
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
