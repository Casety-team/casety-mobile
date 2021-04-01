import * as t from "../actionsTypes/";
import axios from "axios";

export const login = ({ email, password }) => {
  return function (dispatch) {
    return axios
      .post(
        "http://192.168.1.86:4545/api/auth/signin",
        {
          email: email,
          password: password,
        },
        { timeout: 2000 }
      )
      .then((res) => {
        //setDeviceStorage.saveKey("accessToken", response.data.accessToken);
        setTimeout(() => {
          alert("test");
          store.dispatch({
            type: t.SET_LOGIN_STATE,
            payload: res.data,
          });
        }, 2500);
      })
      .catch((err) => {
        alert("Une erreur est survenue");
        console.log("Erreur: ", err);
      });
  };
};
