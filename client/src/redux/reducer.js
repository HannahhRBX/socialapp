import { combineReducers } from "redux";
import userSlice from "./userSlice";
import themeSlice from "./theme";
import postSlice from "./postSlice";

const rootReducer = combineReducers({
    user: userSlice,
    theme: themeSlice,
    posts: postSlice,
});

export {rootReducer};