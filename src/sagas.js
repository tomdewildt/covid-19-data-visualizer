import { all } from "redux-saga/effects";

import { sagas as map } from "./pages/map/duck";

export default function* root() {
    yield all( [
        map(),
    ] );
}
