import React, { Component } from "react";
import MapView from "react-native-maps";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
    };
  }

  componentDidMount() {
    this.fetchMarkerData();
  }

  fetchMarkerData() {
    fetch("http://192.168.1.87:4545/api/locations/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          markers: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
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
        {this.state.isLoading
          ? null
          : this.state.markers.map((marker, index) => {
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
  }
}

export default Home;
