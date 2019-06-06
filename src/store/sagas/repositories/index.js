import { all, takeLatest, call, put, select } from "redux-saga/effects";
import moment from "moment";

import api from "../../../services/api";

import {
  Creators as RepositoriesActions,
  Types as RepositoriesTypes
} from "../../ducks/repositories";

const localStorageMemory = "repositories";

export function* setRepositorie({ payload }) {
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
    localStorage.setItem(localStorageMemory, JSON.stringify(repositories));

    yield put(RepositoriesActions.setRepositories(repositories));
  } catch (err) {
    console.log("err: ", err);
    yield put(RepositoriesActions.getRepositorieError());
  }
}

export function* removeRepositorie({ payload }) {
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
    takeLatest(RepositoriesTypes.GET_REPOSITORIE, setRepositorie),
    takeLatest(RepositoriesTypes.GET_REPOSITORIES, getRepositories),
    takeLatest(RepositoriesTypes.REMOVE_REPOSITORIE, removeRepositorie)
  ]);
}
