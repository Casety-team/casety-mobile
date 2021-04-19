import React from "react";
import { StyleSheet, View } from "react-native";
import { default as UserImage } from "../../assets/app/drawer_button.svg";
import { SvgXml } from "react-native-svg";

export function Avatar() {
  return (
    <View style={styles.container}>
      <SvgXml
        style={{ marginRight: "2%" }}
        width="50"
        height="50"
        xml={UserImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
});
