import * as type from "../types";

const intialState = {
  groupBy: "Status",
  orderBy: "Priority",
};

export default function DisplayData(state = intialState, action) {
  switch (action.type) {
    case type.SET_DISPLAY:
      return {
        groupBy: action.payload.groupBy,
        orderBy: action.payload.orderBy,
      };
    default:
      return state;
  }
}
