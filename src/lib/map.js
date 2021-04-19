import axios from "axios";

const dataMap = {
  async getMyObject() {
    try {
      axios
        .get("http://192.168.1.66:4545/api/locations/", { timeout: 9000 })
        .then(async (item) => {
          await item.data;
        })
        .catch((err) => {
          console.log("Location fail", err);
        });
    } catch (e) {
      console.log("Done.");
    }
  },
};
export default dataMap;
