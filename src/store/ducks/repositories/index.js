export const Types = {
  GET_REPOSITORIE: "respostories/GET_REPOSITORIE",
  GET_REPOSITORIE_ERROR: "respostories/GET_REPOSITORIE_ERROR",

  REMOVE_REPOSITORIE: "respostories/REMOVE_REPOSITORIE",

  GET_REPOSITORIES: "respostories/GET_REPOSITORIES",
  SET_REPOSITORIES: "respostories/SET_REPOSITORIES"
};

const INITIAL_STATE = {
  list: [],
  loading: false,
  error: false
};

export const Creators = {
  getRepositorie: payload => ({ type: Types.GET_REPOSITORIE, payload }),

  getRepositorieError: () => ({ type: Types.GET_REPOSITORIE_ERROR }),

  getRepositories: () => ({ type: Types.GET_REPOSITORIES }),

  setRepositories: respositories => ({
    type: Types.SET_REPOSITORIES,
    payload: { respositories }
  }),

  removeRepositorie: id => ({ type: Types.REMOVE_REPOSITORIE, payload: { id } })
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.GET_REPOSITORIE:
      return { ...state, loading: true, error: false };

    case Types.GET_REPOSITORIE_ERROR:
      return { ...state, loading: false, error: true };

    case Types.SET_REPOSITORIES:
      return {
        ...state,
        loading: false,
        error: false,
        list: payload.respositories
      };

    case Types.REMOVE_REPOSITORIE:
      return {
        ...state,
        list: state.list.filter(repo => repo.id !== payload.id)
      };

    default:
      return state;
  }
}
