import {
  LOCATION_SUCCESS,
  LOCATION_FAIL,
} from "../../actionsTypes/location/location.ActionTypes.js";

const initialState = {
  getAllLocation: [],
  // id: "",
  // name: "",
  // first_adress: "",
  // second_adress: "",
  // city: "",
  // zip_code: "",
  // transport: "",
  // opening_hours: "",
  // closing_hours: "",
  // longitude: "",
  // latitude: "",
  // createdAt: "",
  // updateAt: "",
  // deleteAt: "",
};

const Location = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOCATION_SUCCESS:
      return {
        ...state,
        getAllLocation: [...state.getAllLocation, payload],
      };
    case LOCATION_FAIL:
      return {
        ...state,
        initialState: null,
      };
    default:
      return state;
  }
};

export default Location;
