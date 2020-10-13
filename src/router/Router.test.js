import React from "react";
import { axe } from "jest-axe";

import { renderWithRouter } from "../utils/testUtils";

import Router from "./Router";

describe( "Router", () => {
    it( "renders consistently", () => {
        const { asFragment } = renderWithRouter( <Router /> );
        const fragment = asFragment();

        expect( fragment ).toMatchSnapshot();
    } );

    it( "should have no axe violations", async () => {
        const { container } = renderWithRouter( <Router /> );
        const result = await axe( container );

        expect( result ).toHaveNoViolations();
    } );

    it( "renders map page", () => {
        const { container } = renderWithRouter( <Router />, [ "/" ] );

        expect( container.querySelector( "#map" ) ).toBeInTheDocument();
    } );

    it( "redirects to map page", () => {
        const { container } = renderWithRouter( <Router />, [ "/test" ] );

        expect( container.querySelector( "#map" ) ).toBeInTheDocument();
    } );
} );
