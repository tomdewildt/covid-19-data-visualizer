import { call } from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";

import { runReducer, runSaga } from "../../utils/testUtils";

import {
    LOAD_DATASET,
    LOAD_DATASET_SUCCESS,
    LOAD_DATASET_ERROR,
    api,
    actions,
    selectors,
    reducers,
    sagas,
} from "./duck";

describe( "actions", () => {
    it( "returns LOAD_DATASET action", () => {
        expect( actions.loadDataset() ).toEqual( { type: LOAD_DATASET } );
    } );
} );

describe( "selectors", () => {
    it( "returns the correct \"gemeente\"", () => {
        const gemeente = selectors.getGemeente( 1 );

        expect( gemeente ).toBeDefined();
        expect( gemeente.properties.Gemeentecode ).toEqual( 1 );
    } );

    it( "returns a map of the data", () => {
        const csv = [
            {
                Datum: "2020-01-01",
                Gemeente: "Gemeente 1",
                Gemeentecode: 1,
                PositiefGetest: 1000,
                Provincie: "Provincie",
                Provinciecode: 1,
            },
            {
                Datum: "2020-01-01",
                Gemeente: "Gemeente 2",
                Gemeentecode: 2,
                PositiefGetest: 1000,
                Provincie: "Provincie",
                Provinciecode: 1,
            },
            {
                Datum: "2020-01-02",
                Gemeente: "Gemeente 3",
                Gemeentecode: 3,
                PositiefGetest: 1000,
                Provincie: "Provincie",
                Provinciecode: 1,
            },
        ];

        const data = selectors.getData( csv );

        expect( data.size ).toEqual( 2 );

        const first = data.get( "2020-01-01" );
        expect( first ).toHaveLength( 2 );
        expect( first[ 0 ].properties.Gemeentecode ).toEqual( 1 );
        expect( first[ 1 ].properties.Gemeentecode ).toEqual( 2 );

        const second = data.get( "2020-01-02" );
        expect( second ).toHaveLength( 1 );
        expect( second[ 0 ].properties.Gemeentecode ).toEqual( 3 );
    } );

    it( "returns an empty map if \"gemeente\" is not found", () => {
        const csv = [
            {
                Datum: "2020-01-01",
                Gemeente: "Gemeente 100",
                Gemeentecode: 100,
                PositiefGetest: 1000,
                Provincie: "Provincie",
                Provinciecode: 1,
            },
        ];

        const data = selectors.getData( csv );

        expect( data.size ).toEqual( 0 );
    } );

    it( "returns list of dates", () => {
        const data = new Map( [
            [ "2020-01-01", [] ],
            [ "2020-01-02", [] ],
            [ "2020-06-01", [] ],
            [ "2020-06-02", [] ],
            [ "2020-12-01", [] ],
            [ "2020-12-02", [] ],
        ] );

        const dates = selectors.getDates( data );

        expect( dates ).toEqual( [
            "January 2020",
            "2020-01-01",
            "2020-01-02",
            "June 2020",
            "2020-06-01",
            "2020-06-02",
            "December 2020",
            "2020-12-01",
            "2020-12-02",
        ] );
    } );
} );

describe( "reducers", () => {
    it( "dispatches the correct state on LOAD_DATASET", () => {
        const state = runReducer( reducers, { type: LOAD_DATASET } );

        expect( state.dataset ).toBeNull();
        expect( state.error ).toBeNull();
    } );

    it( "dispatches the correct state on LOAD_DATASET_SUCCESS", () => {
        const state = runReducer( reducers, {
            type: LOAD_DATASET_SUCCESS,
            payload: { data: new Map(), dates: [] },
        } );

        expect( state.dataset ).toEqual( { data: new Map(), dates: [] } );
        expect( state.error ).toBeNull();
    } );

    it( "dispatches the correct state on LOAD_DATASET_ERROR", () => {
        const state = runReducer( reducers, {
            type: LOAD_DATASET_ERROR,
            payload: "An unexpected error occurred.",
        } );

        expect( state.dataset ).toBeNull();
        expect( state.error ).toEqual( "An unexpected error occurred." );
    } );
} );

describe( "sagas", () => {
    it( "dispatches LOAD_DATASET_SUCCESS on success", async () => {
        const response = {
            data: [],
            errors: [],
            meta: {},
        };

        return runSaga( sagas )
            .dispatch( { type: LOAD_DATASET } )
            .provide( [ [ call.fn( api.loadDataset ), response ] ] )
            .put( {
                type: LOAD_DATASET_SUCCESS,
                payload: { data: new Map(), dates: [] },
            } )
            .silentRun();
    } );

    it( "dispatches LOAD_DATASET_ERROR on data integrity error", () => {
        const response = {
            data: [],
            errors: [ {
                type: "Quotes",
                code: "MissingQuotes",
                message: "Quoted field unterminated",
                row: 0,
            } ],
            meta: {},
        };

        return runSaga( sagas )
            .dispatch( { type: LOAD_DATASET } )
            .provide( [ [ call.fn( api.loadDataset ), response ] ] )
            .put( {
                type: LOAD_DATASET_ERROR,
                payload: "An error occurred while parsing the data.",
            } )
            .silentRun();
    } );

    it( "dispatches LOAD_DATASET_ERROR on general error", () => {
        const response = new Error( "error" );

        return runSaga( sagas )
            .dispatch( { type: LOAD_DATASET } )
            .provide( [ [ call.fn( api.loadDataset ), throwError( response ) ] ] )
            .put( {
                type: LOAD_DATASET_ERROR,
                payload: "An unexpected error occurred.",
            } )
            .silentRun();
    } );
} );
