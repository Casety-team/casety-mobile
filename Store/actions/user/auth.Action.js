import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../../actionsTypes/user/login.ActionTypes.js";
import axios from "axios";

export const login = ({ email, password }) => {
  return function (dispatch) {
    return axios
      .post(
        "http://192.168.1.86:4545/api/auth/signin",
        {
          email,
          password,
        },
        { timeout: 2000 }
      )
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        return Promise.resolve();
      })
      .catch((err) => {
        console.log("Erreur: ", err);
        dispatch({
          type: LOGIN_FAIL,
          payload: {},
        });
        return Promise.reject();
      });
  };
};
