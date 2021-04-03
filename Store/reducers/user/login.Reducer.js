import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../../actionsTypes/user/login.ActionTypes.js";
import deviceStorage from "../../../src/services/deviceStorage";

const initialState = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  roles: [""],
  accessToken: "",
};

const Authenticate = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      deviceStorage.savekey("user", payload);
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default Authenticate;
