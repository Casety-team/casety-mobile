import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    height: 32,
    width: 32,
    borderRadius: 50,
    marginRight: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    height: "65%",
    width: "65%",
  },
  titleLocation: {
    fontFamily: "Helvetica-Light",
    fontWeight: "500",
    fontSize: 16,
    marginTop: "3%",
  },
  title: {
    fontFamily: "Helvetica-Light",
    fontWeight: "500",
    fontSize: 30,
    marginTop: "3%",
  },
  subTitle: {
    fontFamily: "Helvetica-Light",
    width: "70%",
    fontSize: 18,
    marginTop: "3%",
    marginBottom: "3%",
  },
  direction: {
    fontSize: 14,
    fontWeight: "400",
    color: "#989CA5",
  },
  differentSelectLabel: {
    fontSize: 16,
    color: "blue",
  },
  differentSelectValue: {
    fontSize: 18,
    color: "#000000",
  },
  input: {
    marginBottom: "3%",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
  },
  inputPicker: {
    marginTop: "-10%",
    width: "100%",
  },
  container: {
    width: "80%",
    height: "100%",
    marginLeft: "10%",
  },
  buttonTop: {
    width: "10%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonTop2: {
    width: "10%",
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  button: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#2067F9",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonForm: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#2067F9",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 40,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 17,
  },
  tinyLogo: {
    paddingRight: 100,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  payCard: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#2067F9",
    borderRadius: 10,
  },
});
