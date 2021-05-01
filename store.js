import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

import IsLoadingToken from "./reducers/isLoadingToken";
import IsLoadingReset from "./reducers/isResetHome";

const rootReducer = combineReducers({
  IsLoadingToken,
  IsLoadingReset,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
