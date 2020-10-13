import { combineReducers } from "redux";

import { reducers as map } from "./pages/map/duck";

export default combineReducers( {
    map,
} );
