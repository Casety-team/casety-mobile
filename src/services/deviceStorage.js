import AsyncStorage from "@react-native-async-storage/async-storage";

const deviceStorage = {
  async getMyObject() {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("Done.");
    }
  },

  async savekey(value) {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(value));
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },

  async deleteJWT() {
    try {
      await AsyncStorage.removeItem("accessToken");
    } catch (error) {
      console.log("Error remove accessToken in storage: " + error.message);
    }
  },
};

export default deviceStorage;
