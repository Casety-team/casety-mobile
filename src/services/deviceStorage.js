import AsyncStorage from "@react-native-async-storage/async-storage";

const deviceStorage = {
  async loadJWT() {
    try {
      console.log("Error for get item =>", error);
      await AsyncStorage.getItem("accessToken");
    } catch (error) {
      console.log("Error for get item =>", error);
      return null;
    }
  },
  async savekey(key, value) {
    try {
      if (JSON.stringify(value.accessToken)) {
        await AsyncStorage.setItem(
          "accessToken",
          JSON.stringify(value.accessToken)
        );
        console.log("Success add accessToken in storage: " + value.accessToken);
      }
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log("Success add all info for user in storage");
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },

  async deleteJWT() {
    try {
      console.log("Success remove accessToken in storage");
      await AsyncStorage.removeItem("accessToken");
    } catch (error) {
      console.log("Error remove accessToken in storage: " + error.message);
    }
  },
};

export default deviceStorage;
