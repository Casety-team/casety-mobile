import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#486CB5",
    height: "100%",
    width: "100%",
  },
  contentEllipse: {
    marginBottom: 150,
    display: "flex",
    flexDirection: "row",
  },
  svgCenter: {
    marginTop: 50,
    marginLeft: 100,
    width: 100,
    height: 100,
  },
  card: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  content: {
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 20,
    marginBottom: 22,
    textAlign: "center",
    fontSize: 30,
    color: "gray",
  },
  subTitle: {
    marginTop: -15,
    marginBottom: 22,
    textAlign: "center",
    fontSize: 17,
    color: "gray",
  },
  inputTitle: {
    marginTop: 10,
    marginBottom: -5,
    fontSize: 15,
    color: "gray",
  },
  textLink: {
    marginTop: 63,
    marginLeft: 1,
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    color: "#B0B0B0",
    textAlign: "center",
  },
  link: {
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    color: "#0F60FB",
    borderBottomColor: "#0F60FB",
    borderBottomWidth: 1,
  },
  checkboxContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    alignSelf: "center",
  },
  smallText: {
    color: "#1E68F9",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 1,
  },
  rowButton: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon_success: {
    marginTop: 19,
  },
  spaceInput: {
    marginTop: 18,
  },
});
