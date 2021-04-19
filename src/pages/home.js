import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { CustomMarker } from "./map/CustomMarker";
import { mapStyle } from "./map/mapStyle";
import { BottomSheet } from "./map/BottomSheet";
import { TopBar } from "./map/TopBar";
import { useMap } from "./map/useMap";

export default function Home({ navigation }) {
  const {
    mapRef,
    selectedMarker,
    handleNavigateToPoint,
    handelResetInitialPosition,
  } = useMap();
  const [locationsData, setLocationsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://api.casety.fr/api/locations/", { timeout: 9000 })
      .then((item) => {
        setLocationsData(item.data);
      })
      .catch((err) => {
        console.log("Location fail", err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <TopBar onPressElement={handelResetInitialPosition} />
      <MapView
        ref={mapRef}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: 48.7988517,
          longitude: 2.3394927,
          latitudeDelta: 0.4,
          longitudeDelta: 0.5,
        }}
        mapType="standard"
      >
        {locationsData &&
          locationsData.map((marker) => (
            <View>
              <CustomMarker
                key={marker.id}
                id={marker.id}
                selectedMarker={selectedMarker}
                latitude={marker.latitude}
                longitude={marker.longitude}
              ></CustomMarker>
            </View>
          ))}
      </MapView>
      <BottomSheet onPressElement={handleNavigateToPoint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
