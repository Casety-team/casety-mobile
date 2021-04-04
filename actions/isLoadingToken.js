import { IS_LOADING_TOKEN } from "../constant";

export const isLoadingToken = (isload) => {
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_TOKEN,
      payload: isload,
    });
  };
};
