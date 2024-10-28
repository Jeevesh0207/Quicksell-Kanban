import * as type from "../types";

const intialState = {
  list: null,
  loading: false,
  error: null,
};

export default function DataList(state = intialState, action) {
  switch (action.type) {
    case type.FETCH_DATA:
      return {
        list: null,
        loading: true,
        error: null,
      };
    case type.FETCH_DATA_SUCCESS:
      return {
        list: action.payload,
        loading: false,
        error: null,
      };
    case type.FETCH_DATA_FAILED:
      return {
        list: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
