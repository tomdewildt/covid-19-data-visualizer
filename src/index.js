import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";

import * as serviceWorker from "./serviceWorker";
import store from "./store";
import App from "./app/App";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById( "root" ),
);

serviceWorker.unregister();
