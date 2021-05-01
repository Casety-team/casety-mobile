import { IS_LOADING_RESET } from "../constant";

export const isLoadingReset = (isload) => {
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_RESET,
      payload: isload,
    });
  };
};
