import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontFamily: "Helvetica",
  },
  code: {
    color: "#2067F9",
    fontWeight: "bold",
    letterSpacing: 5,
    fontSize: 16,
  },
  tinyLogo: {
    marginLeft: 10,
    paddingRight: 100,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
});
