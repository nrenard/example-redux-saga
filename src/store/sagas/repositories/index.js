import { all, takeLatest, call, put, select } from "redux-saga/effects";
import api from "../../../services/api";

import {
  Creators as RepositoriesActions,
  Types as RepositoriesTypes
} from "../../ducks/repositories";

const localStorageMemory = "repositories";

export function* getRepository({ payload }) {
  try {
    const { data } = yield call(api.get, `/repos/${payload}`);
    yield put(RepositoriesActions.getRepositorySuccess(data));
  } catch (err) {
    console.log(err);
    yield put(RepositoriesActions.getRepositoryError());
  }
}

export function* rehydrateRepositories() {
  const repositories =
    JSON.parse(localStorage.getItem(localStorageMemory)) || [];
  yield put(RepositoriesActions.setRepositories(repositories));
}

export function* updateLocalStorage() {
  const {
    repositories: { list }
  } = yield select(state => state);

  /**
   * We shouldn't have  a problem getting current
   * state and setting it into localStorage, since
   * sagas are notified of an action after the action
   * has been forwarded to the reducers - so the state
   * should already be updated.
   *
   * See this link in the redux-saga docs:
   * https://redux-saga.js.org/docs/api/index.html#selectselector-args
   */

  localStorage.setItem(localStorageMemory, JSON.stringify(list));
}

export default function* userSaga() {
  yield all([
    takeLatest(RepositoriesTypes.GET_REPOSITORY, getRepository),
    takeLatest(RepositoriesTypes.REHYDRATE_REPOSITORIES, rehydrateRepositories),
    takeLatest(RepositoriesTypes.REMOVE_REPOSITORY, updateLocalStorage),
    takeLatest(RepositoriesTypes.GET_REPOSITORY_SUCCESS, updateLocalStorage)
  ]);
}
