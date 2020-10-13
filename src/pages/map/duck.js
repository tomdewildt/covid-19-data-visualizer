import { combineReducers } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";
import Papa from "papaparse";

import gemeenten from "../../assets/gemeenten.json";

// Config
const BASE_URL = process.env.REACT_APP_DATA_URL;

// Types
export const LOAD_DATASET = "@map/LOAD_DATASET";
export const LOAD_DATASET_SUCCESS = "@map/LOAD_DATASET_SUCCESS";
export const LOAD_DATASET_ERROR = "@map/LOAD_DATASET_ERROR";

// Actions
export const actions = {
    loadDataset: () => ( { type: LOAD_DATASET } ),
};

// Api
export const api = {
    loadDataset: ( name ) => new Promise( ( resolve, reject ) => Papa.parse(
        `${ BASE_URL }/${ name }`, {
            header: true,
            download: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: resolve,
            error: reject,
        },
    ) ),
};

// Selectors
export const selectors = {
    getGemeente: ( code ) => gemeenten.find(
        ( gemeente ) => gemeente.properties.Gemeentecode === code,
    ),

    getData: ( csv ) => {
        const result = new Map();

        csv.forEach( ( row ) => {
            const gemeente = selectors.getGemeente( row.Gemeentecode );
            if ( !gemeente ) return;

            const key = row.Datum;
            const data = {
                ...gemeente,
                properties: {
                    ...gemeente.properties,
                    ...row,
                },
            };

            if ( result.has( key ) ) {
                result.set( key, [ ...result.get( key ), data ] );
            } else {
                result.set( key, [ data ] );
            }
        } );

        return result;
    },

    getDates: ( data ) => {
        const result = [];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const dates = Array.from( data.keys() );
        dates.forEach( ( date ) => {
            const [ year, month ] = date.split( "-" );

            const divider = `${ months[ month - 1 ] } ${ year }`;
            if ( result.indexOf( divider ) === -1 ) {
                result.push( divider );
            }

            result.push( date );
        } );

        return result;
    },
};

// Reducers
const defaultState = { dataset: null, error: null };

const dataset = ( state = defaultState.dataset, { type, payload } ) => {
    if ( type === LOAD_DATASET ) {
        return defaultState.dataset;
    }
    if ( type === LOAD_DATASET_SUCCESS ) {
        return payload;
    }
    if ( type === LOAD_DATASET_ERROR ) {
        return defaultState.dataset;
    }
    return state;
};

const error = ( state = defaultState.error, { type, payload } ) => {
    if ( type === LOAD_DATASET ) {
        return defaultState.error;
    }
    if ( type === LOAD_DATASET_SUCCESS ) {
        return defaultState.error;
    }
    if ( type === LOAD_DATASET_ERROR ) {
        return payload;
    }
    return state;
};

export const reducers = combineReducers( { dataset, error } );

// Sagas
function* loadDataset() {
    try {
        const result = yield call( api.loadDataset, "rivm-covid-19-municipality.csv" );

        if ( result.errors.length > 0 ) {
            return yield put( {
                type: LOAD_DATASET_ERROR,
                payload: "An error occurred while parsing the data.",
            } );
        }

        const data = yield call( selectors.getData, result.data );
        const dates = yield call( selectors.getDates, data );

        return yield put( {
            type: LOAD_DATASET_SUCCESS,
            payload: { data, dates },
        } );
    } catch ( e ) {
        return yield put( {
            type: LOAD_DATASET_ERROR,
            payload: "An unexpected error occurred.",
        } );
    }
}

export const sagas = function* main() {
    yield takeLatest( LOAD_DATASET, loadDataset );
};
