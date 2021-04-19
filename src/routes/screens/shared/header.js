import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ navigation, title }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <Ionicons
        style={styles.icon}
        name="menu"
        size={32}
        color="black"
        onPress={openMenu}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "rgb(68, 104, 176)",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    color: "rgb(68, 104, 176)",
    left: -80,
  },
});
