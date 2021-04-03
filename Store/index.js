import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import Authenticate from "./reducers/user/login.Reducer";
import Register from "./reducers/user/register.Reducer";

const rootReducer = combineReducers({
  Authenticate: Authenticate,
  Register: Register,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
