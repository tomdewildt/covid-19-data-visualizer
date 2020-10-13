import React from "react";
import { axe } from "jest-axe";

import { renderWithTheme } from "../../utils/testUtils";

import PageMap from "./Map";

describe( "Map", () => {
    it( "renders consistently", () => {
        const { asFragment } = renderWithTheme( <PageMap /> );
        const fragment = asFragment();

        expect( fragment ).toMatchSnapshot();
    } );

    it( "should have no axe violations", async () => {
        const { container } = renderWithTheme( <PageMap /> );
        const result = await axe( container );

        expect( result ).toHaveNoViolations();
    } );
} );
