import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../../actionsTypes/user/register.ActionTypes.js";
import deviceStorage from "../../../src/services/deviceStorage";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
  adress: "",
  city: "",
  zip: "",
  roles: ["user"],
};

const Register = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      deviceStorage.savekey("user", payload);
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default Register;
