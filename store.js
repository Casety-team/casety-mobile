import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

import IsLoadingToken from "./reducers/isLoadingToken";

const rootReducer = combineReducers({
  IsLoadingToken,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
