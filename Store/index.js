import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import Authenticate from "./reducers/authReducer";

const rootReducer = combineReducers({
  Authenticate: Authenticate,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
