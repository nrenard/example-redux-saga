import { combineReducers } from "redux";

import loading from "./loading/reducer";
import repositories from "./repositories/reducer";

const rootReducer = combineReducers({
  loading,
  repositories
});

export default rootReducer;
