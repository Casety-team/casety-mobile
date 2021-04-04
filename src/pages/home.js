import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import axios from "axios";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState();

  useEffect(() => {
    refreshMap();
  }, [isLoading]);

  const refreshMap = () => {
    axios
      .get("http://192.168.1.44:4545/api/locations/", { timeout: 9000 })
      .then(async (item) => {
        setMarkers(item.data);
      })
      .catch((err) => {
        console.log("Location fail", err);
      });
  };

  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: 48.8534,
        longitude: 2.3488,
        latitudeDelta: 0.4,
        longitudeDelta: 0.5,
      }}
    >
      {markers &&
        markers.map((item, index) => {
          const coords = {
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          };

          const metadata = `Heures d'ouverture: ${item.opening_hours} Heures de fermeture: ${item.closing_hours}`;

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={item.transport}
              description={metadata}
            />
          );
        })}
    </MapView>
  );
};

export default Home;
