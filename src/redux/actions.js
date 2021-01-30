import { ADD_RECIPES } from "./actionTypes";

// action = {type: Nom_ACTION, payload: data}
export const fetchRecipesAction = (data) => ({
  type: ADD_RECIPES,
  payload: {
    data,
  },
});
