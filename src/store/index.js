import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import api from '../services/api';

/*eslint-disable */
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
/*eslint-enable */
const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument({ api })));

export default createStore(rootReducer, enhancer);
