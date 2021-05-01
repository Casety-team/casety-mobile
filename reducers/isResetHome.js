import { IS_LOADING_RESET } from "../constant";

const initialState = {
  isLoadingReset: false,
};

const IsLoadingReset = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case IS_LOADING_RESET:
      return {
        ...state,
        isLoadingReset: payload,
      };
    default:
      return state;
  }
};

export default IsLoadingReset;
