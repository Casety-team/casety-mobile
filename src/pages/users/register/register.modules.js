import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#486CB5",
    height: "100%",
    width: "100%",
  },
  contentEllipse: {
    display: "flex",
    flexDirection: "row",
  },
  svgRight: {
    marginRight: "2%",
    width: "10",
    height: "10",
  },
  svgLeft: {
    marginLeft: "2%",
    width: "10",
    height: "10",
  },
  card: {
    marginTop: "20%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  content: {
    width: "75%",
    height: "100%",
    marginLeft: "10%",
  },
  title: {
    marginTop: 52,
    marginBottom: 22,
    fontSize: 30,
    //fontFamily: "Morton",
  },
  subTitle: {
    fontSize: 17,
    fontWeight: "bold",
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
  icon_eye: {
    marginTop: 19,
    marginRight: 5,
  },
  icon_success: {
    marginTop: 19,
  },
  spaceInput: {
    marginTop: 18,
  },
});
