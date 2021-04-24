import React from "react";
import { SvgXml } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import direction from "../assets/app/direction.svg";

const ButtonCirle = (props) => {
  return (
    <TouchableOpacity onPress={props.navigation}>
      <LinearGradient
        colors={["#6693EB", "#3375F5", "#2063FA"]}
        style={[styles.button, { width: props.width }]}
      >
        <View style={styles.row}>
          <Text style={styles.buttonText}>{props.name}</Text>
          <View style={{ marginLeft: props.arrowSpace, marginTop: 3 }}>
            <SvgXml width="15" height="15" xml={direction} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: "#2067F9",
  },
  buttonText: {
    textAlign: "left",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 17,
  },
});

export default ButtonCirle;
