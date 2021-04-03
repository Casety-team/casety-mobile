import AsyncStorage from "@react-native-async-storage/async-storage";

const deviceStorage = {
  async loadJWT(item) {
    try {
      const value = await AsyncStorage.getItem(item);
      if (value !== null) {
        console.log("GetItems in local storage =>", JSON.parse(value));
      }
    } catch (error) {
      console.log("Error for get item =>", error);
    }
  },
  async savekey(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },

  async deleteJWT() {
    try {
      await AsyncStorage.removeItem("accessToken").then(() => {
        this.setState({
          jwt: "",
        });
      });
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
};

export default deviceStorage;
