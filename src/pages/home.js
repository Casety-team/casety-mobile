import { URL_API } from "@env";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

//Components
import { StyleSheet, View, Dimensions, Text } from "react-native";
//Map Components
import { useMap } from "./map/functions/useMap";
import { mapStyle } from "./map/functions/mapStyle";
import { TopBar } from "./map/components/TopBar";
import { CustomMarker } from "./map/config/CustomMarker";
import { BottomSheet } from "./map/components/BottomSheet";

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
      .get("https://api.casety.fr/api/locations/", { timeout: 9000 })
      .then((item) => {
        console.log("Get Location Success");
        setLocationsData(item.data);
      })
      .catch((err) => {
        console.log("Get Location fail =>", err);
      });
  }, []);

  return (
    <View>
      <TopBar
        navigation={navigation}
        onPressElement={handelResetInitialPosition}
      />
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
                latitude={Number(marker.latitude)}
                longitude={Number(marker.longitude)}
              />
            </View>
          ))}
      </MapView>
      <BottomSheet
        navigation={navigation}
        onPressElement={handleNavigateToPoint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
