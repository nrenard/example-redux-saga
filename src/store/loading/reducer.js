import { START_LOADING, STOP_LOADING } from "./actions";

const defaultState = false;

export default function loading(state = defaultState, action) {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STOP_LOADING:
      return false;
    default:
      return state;
  }
}
