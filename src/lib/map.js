//import { default as logo } from "../../assets/dark_logo.png";
// export const MARKERS_DATA = [
//   {
//     id: "1",
//     latitude: 41.3997999,
//     longitude: 2.1909796,
//     name: "Reboot Studio",
//     direction: "Carrer de Pujades, 100",

//     color: "#2F3136",
//     img: logo,
//   },
// ];

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
