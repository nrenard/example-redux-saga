import { combineReducers } from "redux";

import repository from "./repository/reducer";

const rootReducer = combineReducers({
  repository
});

export default rootReducer;
