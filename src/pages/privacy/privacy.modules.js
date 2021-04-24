import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F4F5FA",
  },
  backIcon: {
    position: "absolute",
    zIndex: 1,
    left: 20,
    top: 70,
  },
  picture: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
    width: 100,
    height: 150,
  },
  content: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    textAlign: "right",
  },
  title: {
    fontSize: 35,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 50,
  },
  smallTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
  },
  paragraph: {
    marginTop: 30,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 10,
  },
});
