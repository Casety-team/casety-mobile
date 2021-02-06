import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import backgroundLogo from "../../assets/logo.png";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image
          source={backgroundLogo}
          style={{ width: "auto", height: "50%" }}
        />
        <Button
          onPress={() => navigation.navigate("Register")}
          title="Register"
          type="solid"
          style={(styles.button, { marginTop: "10%" })}
          titleStyle={{ color: "rgb(68, 104, 176)" }}
          buttonStyle={{
            backgroundColor: "white",
          }}
        />
        <Button
          title="Login"
          type="solid"
          onPress={() => navigation.navigate("Login")}
          style={(styles.button, { marginTop: "10%" })}
          titleStyle={{ color: "rgb(68, 104, 176)" }}
          buttonStyle={{
            backgroundColor: "white",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "#4b6aab",
  },
  container: {
    marginTop: "30%",
    marginLeft: "20%",
    marginRight: "20%",
  },
});

export default Welcome;
