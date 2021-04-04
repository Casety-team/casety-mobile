import React, { useState } from "react";
import MapView from "react-native-maps";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

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
      {isLoading
        ? null
        : markers.map((marker, index) => {
            const coords = {
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude),
            };

            const metadata = `Heures d'ouverture: ${marker.opening_hours} Heures de fermeture: ${marker.closing_hours}`;

            return (
              <MapView.Marker
                key={index}
                coordinate={coords}
                title={marker.transport}
                description={metadata}
              />
            );
          })}
    </MapView>
  );
};

export default Home;
