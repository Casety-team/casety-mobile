import { AsyncStorage } from "react-native";

const getDeviceStorage = {
  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem("id_token");
      if (value !== null) {
        this.setState({
          jwt: value,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
};

export default getDeviceStorage;
