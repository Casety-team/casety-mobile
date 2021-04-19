import AsyncStorage from "@react-native-async-storage/async-storage";

const deviceStorage = {
  //Get an JWT Token
  async getMyObject() {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(
        "An error occurred while loading the local storage =>",
        error
      );
    }
  },

  //Add an JWT Token
  async savekey(value) {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(value));
    } catch (error) {
      console.log("An error occurred while adding to local storage =>" + error);
    }
  },

  //Delete JWT Token
  async deleteJWT() {
    try {
      await AsyncStorage.removeItem("accessToken");
    } catch (error) {
      console.log("Error remove accessToken in storage: " + error);
    }
  },
};

export default deviceStorage;
