import * as type from "../types";

const intialState = {
  filterData: [],
};

export default function FilterData(state = intialState, action) {
  switch (action.type) {
    case type.FILTER_DATA:
      return {
        filterData: action.payload,
      };
    default:
      return state;
  }
}
