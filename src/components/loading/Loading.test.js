import React from "react";
import { axe } from "jest-axe";

import { renderWithTheme } from "../../utils/testUtils";

import Loading from "./Loading";

describe( "Loading", () => {
    it( "renders consistently", () => {
        const { asFragment } = renderWithTheme( <Loading /> );
        const fragment = asFragment();

        expect( fragment ).toMatchSnapshot();
    } );

    it( "should have no axe violations", async () => {
        const { container } = renderWithTheme( <Loading /> );
        const result = await axe( container );

        expect( result ).toHaveNoViolations();
    } );

    it( "respects the title prop", () => {
        const { getByTitle } = renderWithTheme( <Loading title="title" /> );
        const title = getByTitle( "title" );

        expect( title ).toBeInTheDocument();
    } );

    it( "respects the message prop", () => {
        const { getByText } = renderWithTheme( <Loading message="message" /> );
        const message = getByText( "message" );

        expect( message ).toBeInTheDocument();
    } );
} );
