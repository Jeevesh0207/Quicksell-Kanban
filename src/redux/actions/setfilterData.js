import * as type from "../types";

export function setfilterData(data) {
  return {
    type: type.FILTER_DATA,
    payload: data,
  };
}
