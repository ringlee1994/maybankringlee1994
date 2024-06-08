import { combineReducers } from "@reduxjs/toolkit";
import saveSearchResultReducer from "./savesearchresult";

const rootReducer = combineReducers({
    saveSearchResultReducer,
});

export default rootReducer;