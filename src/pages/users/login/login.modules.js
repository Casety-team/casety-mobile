import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#486CB5",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  card: {
    marginTop: "37%",
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
    marginTop: "14%",
    marginBottom: "10%",
    fontSize: 30,
    //fontFamily: "Morton",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  spaceInput: {
    marginTop: 18,
  },
  smallText: {
    fontSize: 10,
    color: "#B0B0B0",
    fontFamily: "Helvetica-Light",
    marginTop: 17,
    marginLeft: "-1%",
    marginBottom: 100,
  },
  textLink: {
    marginTop: 152,
    marginLeft: 1,
    color: "#B0B0B0",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    textAlign: "center",
  },
  link: {
    fontSize: 17,
    fontFamily: "Helvetica",
    color: "#0F60FB",
    borderBottomColor: "#0F60FB",
    borderBottomWidth: 1,
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
});
