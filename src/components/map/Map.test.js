import React from "react";
import { axe } from "jest-axe";

import { renderWithTheme } from "../../utils/testUtils";

import Map from "./Map";

//
// NOTE:
//
// This component needs better testing, unfortunatly this won't be possible
// until Deck.GL provides a better testing interface.
//
// - Test if layers are correctly generated
// - Test if the tooltip renders correctly on hover
// - Test if the tooltip is removed after hover
//
describe( "Map", () => {
    const data = [];
    const viewState = {
        latitude: 0.0,
        longitude: 0.0,
        zoom: 7,
        pitch: 0,
        bearing: 0,
    };

    it( "renders consistently", () => {
        const { asFragment } = renderWithTheme( (
            <Map
                data={ data }
                viewState={ viewState }
            />
        ) );
        const fragment = asFragment();

        expect( fragment ).toMatchSnapshot();
    } );

    it( "should have no axe violations", async () => {
        const { container } = renderWithTheme( (
            <Map
                data={ data }
                viewState={ viewState }
            />
        ) );
        const result = await axe( container );

        expect( result ).toHaveNoViolations();
    } );
} );
