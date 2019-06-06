export const Types = {
  GET_REPOSITORY: "repositories/GET_REPOSITORY",
  GET_REPOSITORY_ERROR: "repositories/GET_REPOSITORY_ERROR",
  REMOVE_REPOSITORY: "repositories/REMOVE_REPOSITORY",
  GET_REPOSITORIES: "repositories/GET_REPOSITORIES",
  SET_REPOSITORIES: "repositories/SET_REPOSITORIES"
};

const INITIAL_STATE = {
  list: [],
  loading: false,
  error: false
};

export const Creators = {
  getRepository: payload => ({ type: Types.GET_REPOSITORY, payload }),

  getRepositoryError: () => ({ type: Types.GET_REPOSITORY_ERROR }),

  getRepositories: () => ({ type: Types.GET_REPOSITORIES }),

  setRepositories: respositories => ({
    type: Types.SET_REPOSITORIES,
    payload: { respositories }
  }),

  removeRepository: id => ({ type: Types.REMOVE_REPOSITORY, payload: { id } })
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.GET_REPOSITORY:
      return { ...state, loading: true, error: false };

    case Types.GET_REPOSITORY_ERROR:
      return { ...state, loading: false, error: true };

    case Types.SET_REPOSITORIES:
      return {
        ...state,
        loading: false,
        error: false,
        list: payload.respositories
      };

    case Types.REMOVE_REPOSITORY:
      return {
        ...state,
        list: state.list.filter(repo => repo.id !== payload.id)
      };

    default:
      return state;
  }
}
