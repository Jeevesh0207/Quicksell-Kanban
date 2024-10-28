import { combineReducers } from "@reduxjs/toolkit";
import DisplayData from "./displayData";
import DataList from "./dataList";
import FilterData from "./filterData";

const rootReducer = combineReducers({
  getDisplayData: DisplayData,
  getDataList: DataList,
  getFilterData: FilterData,
});

export default rootReducer;
