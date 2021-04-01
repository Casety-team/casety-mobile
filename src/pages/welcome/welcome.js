import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { ceil } from "react-native-reanimated";
import backgroundLogo from "./pictures/bg_welcome.png";

const Welcome = ({ navigation }) => {
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#F4F5FA" }}>
      <View>
        <Image
          source={backgroundLogo}
          style={{ width: "auto", height: "50%" }}
        />
        <Text style={[styles.container]}>
          <Text style={styles.text}>
            <Text style={styles.span}>Prêt à</Text> vous déplacer sans encombre
            ?
          </Text>
        </Text>
        <Text style={[styles.container, styles.smallText]}>
          Laissez vos bagages en sécurité !
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Créer un compte</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: "5%" }}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginLeft: "10%",
    marginTop: "10%",
    marginBottom: "0%",
    fontSize: 33,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  span: {
    color: "#4369B0",
  },
  smallText: {
    fontSize: 22,
    fontFamily: "Helvetica-Light",
    marginBottom: "10%",
  },
  button: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#2067F9",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 22,
  },
});

export default Welcome;
