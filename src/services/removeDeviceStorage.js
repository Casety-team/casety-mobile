import { AsyncStorage } from "react-native";

const removeDeviceStorage = {
  async deleteJWT() {
    try {
      await AsyncStorage.removeItem("id_token").then(() => {
        this.setState({
          jwt: "",
        });
      });
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
};

export default removeDeviceStorage;
