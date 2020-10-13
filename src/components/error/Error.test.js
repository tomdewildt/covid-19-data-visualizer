import React from "react";
import { axe } from "jest-axe";

import { renderWithTheme } from "../../utils/testUtils";

import Error from "./Error";

describe( "Error", () => {
    it( "renders consistently", () => {
        const { asFragment } = renderWithTheme( <Error /> );
        const fragment = asFragment();

        expect( fragment ).toMatchSnapshot();
    } );

    it( "should have no axe violations", async () => {
        const { container } = renderWithTheme( <Error /> );
        const result = await axe( container );

        expect( result ).toHaveNoViolations();
    } );

    it( "respects the title prop", () => {
        const { getByTitle } = renderWithTheme( <Error title="title" /> );
        const title = getByTitle( "title" );

        expect( title ).toBeInTheDocument();
    } );

    it( "respects the message prop", () => {
        const { getByText } = renderWithTheme( <Error message="message" /> );
        const message = getByText( "message" );

        expect( message ).toBeInTheDocument();
    } );
} );
