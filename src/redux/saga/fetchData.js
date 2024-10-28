import { call, put, takeEvery } from "redux-saga/effects";

const apiUrl = process.env.REACT_APP_URL;

async function getApi() {
  return fetch(apiUrl, {
    method: "GET",
  })
    .then(async (response) => await response.json())
    .catch((error) => {
      throw error;
    });
}

function* fetchData() {
  try {
    const response = yield call(getApi);
    yield put({ type: "FETCH_DATA_SUCCESS", payload: response });
  } catch (e) {
    yield put({ type: "FETCH_DATA_FAILED", payload: e.message });
  }
}

function* userSaga() {
  yield takeEvery("FETCH_DATA", fetchData);
}

export default userSaga;
