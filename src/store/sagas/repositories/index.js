import { all, takeLatest, call, put, select } from "redux-saga/effects";
import moment from "moment";

import api from "../../../services/api";

import {
  Creators as RepositoriesActions,
  Types as RepositoriesTypes
} from "../../ducks/repositories";

const localStorageMemory = "repositories";

export function* setRepository({ payload }) {
  const {
    repositories: { list: repositories }
  } = yield select(state => state);

  try {
    const { data } = yield call(api.get, `/repos/${payload}`);

    if (repositories.find(repository => repository.id === data.id)) {
      throw new Error("Repository already exists.");
    }

    data.lastCommit = moment(data.pushed_at).fromNow();
    repositories.push(data);

    yield put(RepositoriesActions.setRepositories(repositories));
  } catch (err) {
    console.log("err: ", err);
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

  localStorage.setItem(localStorageMemory, JSON.stringify(list));
}

export default function* userSaga() {
  yield all([
    takeLatest(RepositoriesTypes.GET_REPOSITORY, setRepository),
    takeLatest(RepositoriesTypes.REHYDRATE_REPOSITORIES, rehydrateRepositories),
    takeLatest(RepositoriesTypes.REMOVE_REPOSITORY, updateLocalStorage),
    takeLatest(RepositoriesTypes.SET_REPOSITORIES, updateLocalStorage)
  ]);
}
