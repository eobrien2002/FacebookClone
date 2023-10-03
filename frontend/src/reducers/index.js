import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

//combine all the reducers into one root reducer
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
