import axios from "axios";

import { fetchRecipesAction } from "../../redux/actions";

const ENDPOINT_RECIPES = "http://localhost:4545/api/";

export const fetchAllLocations = async (dispatch, query) => {
  try {
    console.log("In fetch Location");

    const response = await axios.get(ENDPOINT_RECIPES + "locations/");
    console.log(response.data);

    dispatch(fetchRecipesAction(response.data));
  } catch (e) {
    console.log("error request Locations", e);
  }
};
