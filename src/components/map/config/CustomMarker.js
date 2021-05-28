//Custom Marker
import React from "react";
import { Marker } from "react-native-maps";
import Animated from "react-native-reanimated";
import { StyleSheet, View, Image } from "react-native";
import { useMarkerAnimation } from "../functions/useMarkerAnimation";
import { default as logo } from "../../../../assets/app/light_logo.png";

export function CustomMarker({
  id,
  selectedMarker,
  color,
  latitude,
  longitude,
}) {
  const scale = useMarkerAnimation({ id, selectedMarker });

  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
    >
      <View style={styles.markerWrapper}>
        <Animated.View
          style={[
            styles.marker,
            {
              backgroundColor: color,
              transform: [{ scale: scale }],
            },
          ]}
        >
          <Image source={logo} style={styles.image} />
        </Animated.View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  markerWrapper: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    height: 50,
    width: 50,
  },
  image: {
    height: 30,
    width: 20,
    marginLeft: 12,
    marginTop: 8,
  },
});
