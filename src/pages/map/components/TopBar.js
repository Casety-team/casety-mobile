//TopBar.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { DrawerButton } from "../buttons/DrawerButton";
import { RefreshButton } from "../buttons/RefreshButton";

export function TopBar({ navigation, onPressElement }) {
  return (
    <View style={styles.container}>
      <DrawerButton navigation={navigation} />
      <RefreshButton onPressElement={onPressElement} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 40,
    width: "100%",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
