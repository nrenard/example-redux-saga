import { all } from "redux-saga/effects";

import repositoriesSaga from "./repositories";

export default function* rootSaga() {
  yield all([repositoriesSaga()]);
}
