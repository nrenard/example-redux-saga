import { SET_REPOSITORY, REMOVE_REPOSITORY } from "./actions";

const defaultState = [];

export default function repositories(state = defaultState, action) {
  switch (action.type) {
    case SET_REPOSITORY:
      return [...state, action.payload];
    case REMOVE_REPOSITORY:
      const repositoriesWithoutPayload = state.filter(
        repo => repo.id !== action.payload
      );
      return repositoriesWithoutPayload;
    default:
      return state;
  }
}
