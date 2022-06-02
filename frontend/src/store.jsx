import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  reportCreateReducer,
  reportDeleteReducer,
  reportListReducer,
  reportUpdateReducer,
} from "./reducers/reportsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  reportList: reportListReducer,
  reportCreate: reportCreateReducer,
  reportDelete: reportDeleteReducer,
  reportUpdate: reportUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
