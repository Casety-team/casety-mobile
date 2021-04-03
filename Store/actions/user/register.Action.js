import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../../actionsTypes/user/register.ActionTypes.js";
import axios from "axios";

export const register = ({
  email,
  password,
  first,
  last,
  phone,
  city,
  adress,
  codePostal,
}) => {
  return function (dispatch) {
    return axios
      .post(
        "http://192.168.1.86:4545/api/auth/signup",
        {
          firstname: first,
          lastname: last,
          email,
          password,
          phone,
          city,
          adress,
          zip: codePostal,
          roles: ["user"],
        },
        { timeout: 2000 }
      )
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        return Promise.resolve();
      })
      .catch((err) => {
        console.log("Erreur: ", err);
        dispatch({
          type: REGISTER_FAIL,
          payload: {},
        });
        return Promise.reject();
      });
  };
};
