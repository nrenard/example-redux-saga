import {
  SET_ERROR,
  STOP_LOADING,
  START_LOADING,
  SET_REPOSITORY,
  SET_REPOSITORIES,
} from "./actions";

const defaultState = {
  loading: false,
  repositories: [],
  error: false,
};

export default function repository(state = defaultState, action) {
  switch (action.type) {
    case SET_REPOSITORY:
      return { ...state, repositories: [...state.repositories, action.payload], error: false };
    case SET_REPOSITORIES:
      return { ...state, repositories: action.payload };
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case SET_ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
}
