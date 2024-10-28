import * as type from "../types";

export function setDisplayData(data) {
  return {
    type: type.SET_DISPLAY,
    payload: data,
  };
}
