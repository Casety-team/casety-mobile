//BottomSheet.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import { ListItem } from "./ListItem";

const windowHeight = Dimensions.get("window").height;

export function BottomSheet({ onPressElement }) {
  const [locationsData, setLocationsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.66:4545/api/locations/", { timeout: 9000 })
      .then((item) => {
        setLocationsData(item.data);
      })
      .catch((err) => {
        console.log("Location fail", err);
      });
  }, []);

  return (
    <ScrollBottomSheet
      componentType="FlatList"
      snapPoints={[100, "50%", windowHeight - 200]}
      initialSnapIndex={1}
      renderHandle={() => (
        <View style={styles.header}>
          <View style={styles.panelHandle} />
        </View>
      )}
      data={locationsData}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <ListItem item={item} onPressElement={onPressElement} />
      )}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  panelHandle: {
    width: 41,
    height: 4,
    backgroundColor: "#E1E1E1",
    borderRadius: 17,
  },
});
