import { AsyncStorage } from "react-native";

const setDeviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
};

export default setDeviceStorage;
