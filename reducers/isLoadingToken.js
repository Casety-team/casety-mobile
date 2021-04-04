import { IS_LOADING_TOKEN } from "../constant";

const initialState = {
  isLoadingToken: false,
};

const IsLoadingToken = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case IS_LOADING_TOKEN:
      console.log(payload);
      return {
        ...state,
        isLoadingToken: payload,
      };
    default:
      return state;
  }
};

export default IsLoadingToken;
