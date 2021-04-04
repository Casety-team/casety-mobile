import {
  LOCATION_SUCCESS,
  LOCATION_FAIL,
} from "../../actionsTypes/location/location.ActionTypes";
import axios from "axios";

export const getLocation = () => {
  return function (dispatch) {
    return axios
      .get("http://192.168.1.86:4545/api/locations/", { timeout: 2000 })
      .then((res) => {
        dispatch({
          type: LOCATION_SUCCESS,
          payload: res.data,
        });
        return Promise.resolve();
      })
      .catch((err) => {
        dispatch({
          type: LOCATION_FAIL,
          payload: {},
        });
        return Promise.reject();
      });
  };
};
