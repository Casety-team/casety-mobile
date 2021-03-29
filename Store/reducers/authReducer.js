import { SET_LOGIN_STATE } from "../actionsTypes";

const initialState = {
  isLoggedIn: false,
  userId: "",
  token: "",
  refreshToken: "",
  expiresOn: "",
  data: "",
};

const Authenticate = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
export default Authenticate;
