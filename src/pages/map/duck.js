import { combineReducers } from "redux";

// Types

// Actions
export const actions = {};

// Selectors
export const selectors = {};

// Reducers
const defaultState = { data: null };

const data = ( state = defaultState.data ) => state;

export const reducers = combineReducers( { data } );

// Sagas
export const sagas = function* main() {
    yield;
};
