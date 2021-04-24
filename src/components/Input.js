import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputCircleText = (props) => {
  return <TextInput {...props} style={styles.inputCircle} />;
};

const InputUnderLineText = (props) => {
  return <TextInput {...props} style={styles.inputUnderline} />;
};

const styles = StyleSheet.create({
  inputCircle: {
    marginBottom: "3%",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
  },
  inputUnderline: {
    width: "100%",
    marginTop: 5,
    marginBottom: "3%",
    paddingVertical: 13,
    paddingHorizontal: 0,
    // borderBottomColor: "#A5A5A5",
    // borderBottomWidth: 1,
    //borderWidth: 1,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    color: "#939090",
  },
});

export { InputCircleText, InputUnderLineText };
