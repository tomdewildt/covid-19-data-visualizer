import React from "react";
import { axe } from "jest-axe";

import { renderWithProvider } from "../../utils/testUtils";

import { LOAD_DATASET } from "./duck";
import PageMap from "./Map";

describe( "Map", () => {
    it( "renders consistently", () => {
        const { asFragment } = renderWithProvider( <PageMap /> );
        const fragment = asFragment();

        expect( fragment ).toMatchSnapshot();
    } );

    it( "should have no axe violations", async () => {
        const { container } = renderWithProvider( <PageMap /> );
        const result = await axe( container );

        expect( result ).toHaveNoViolations();
    } );

    it( "renders loading screen", () => {
        const { getByText, store } = renderWithProvider( <PageMap />, {
            map: {
                dataset: null,
                error: null,
            },
        } );
        const loading = getByText( "Loading..." );

        expect( loading ).toBeInTheDocument();
        expect( store.getActions() ).toEqual( [ { type: LOAD_DATASET } ] );
    } );

    it( "renders success screen", () => {
        const { store } = renderWithProvider( <PageMap />, {
            map: {
                dataset: { data: new Map(), dates: [] },
                error: null,
            },
        } );

        // TODO(tomdewildt): assert that the map is rendered
        expect( store.getActions() ).toEqual( [ { type: LOAD_DATASET } ] );
    } );

    it( "renders error screen", () => {
        const { getByText, store } = renderWithProvider( <PageMap />, {
            map: {
                dataset: null,
                error: "An unexpected error occurred.",
            },
        } );
        const error = getByText( "An unexpected error occurred." );

        expect( error ).toBeInTheDocument();
        expect( store.getActions() ).toEqual( [ { type: LOAD_DATASET } ] );
    } );
} );
