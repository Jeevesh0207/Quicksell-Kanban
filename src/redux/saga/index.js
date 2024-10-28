import { all } from "redux-saga/effects";
import fetchData from "./fetchData";

export default function* rootSaga() {
  yield all([fetchData()]);
}
