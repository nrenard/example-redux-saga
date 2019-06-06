import { all, takeLatest, call, put, select } from "redux-saga/effects";
import api from "../../../services/api";

import {
  Creators as RepositoriesActions,
  Types as RepositoriesTypes
} from "../../ducks/repositories";

const localStorageMemory = "repositories";

export function* setRepository({ payload }) {
  const {
    repositories: { list }
  } = yield select(state => state);

  try {
    const { data } = yield call(api.get, `/repos/${payload}`);

    const repositories = list.filter(repository => repository.id !== data.id);

    repositories.push(data);
    localStorage.setItem(localStorageMemory, JSON.stringify(repositories));

    yield put(RepositoriesActions.setRepositories(repositories));
  } catch (err) {
    yield put(RepositoriesActions.getRepositoryError());
  }
}

export function* removeRepository({ payload }) {
  const {
    repositories: { list }
  } = yield select(state => state);
  const repositories = list.filter(repository => repository.id !== payload.id);

  localStorage.setItem(localStorageMemory, JSON.stringify(repositories));
}

export function* getRepositories() {
  const repositories =
    JSON.parse(localStorage.getItem(localStorageMemory)) || [];
  yield put(RepositoriesActions.setRepositories(repositories));
}

export default function* userSaga() {
  yield all([
    takeLatest(RepositoriesTypes.GET_REPOSITORY, setRepository),
    takeLatest(RepositoriesTypes.GET_REPOSITORIES, getRepositories),
    takeLatest(RepositoriesTypes.REMOVE_REPOSITORY, removeRepository)
  ]);
}
