import moment from "moment";

export const SET_REPOSITORY = "@repository/SET_REPOSITORY";
export function setRepository(payload) {
  return {
    type: SET_REPOSITORY,
    payload
  };
}

export function getRepository(repository) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch(startLoading());
      const { data } = await api.get(`/repos/${repository}`);
      data.lastCommit = moment(data.pushed_at).fromNow();
      dispatch(setRepository(data));
    } catch (err) {
      dispatch(setError());
    } finally {
      dispatch(stopLoading());
    }
  };
}

export const SET_ERROR = '@repository/SET_ERROR';
export function setError() {
  return {
    type: SET_ERROR
  }
}

export const SET_REPOSITORIES = '@repository/SET_REPOSITORIES';
export function setRepositories(payload) {
  return {
    type: SET_REPOSITORIES,
    payload
  }
}

export function removeRepository(payload) {
  return async (dispatch, getState) => {
    const { repositories } = getState().repository;
    const repositoriesWithoutPayload = repositories.filter(
      repo => repo.id !== payload
    );
    dispatch(setRepositories(repositoriesWithoutPayload));
  }
}

export const START_LOADING = '@repository/START_LOADING';
export function startLoading() {
  return {
    type: START_LOADING
  }
}

export const STOP_LOADING = '@repository/STOP_LOADING';
export function stopLoading() {
  return {
    type: STOP_LOADING
  }
}
