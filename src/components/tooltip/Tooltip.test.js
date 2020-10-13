import React from "react";
import { axe } from "jest-axe";

import { renderWithTheme } from "../../utils/testUtils";

import Tooltip from "./Tooltip";

describe( "Tooltip", () => {
    it( "renders consistently", () => {
        const { asFragment } = renderWithTheme( <Tooltip x={ 0 } y={ 0 } /> );
        const fragment = asFragment();

        expect( fragment ).toMatchSnapshot();
    } );

    it( "should have no axe violations", async () => {
        const { container } = renderWithTheme( <Tooltip x={ 0 } y={ 0 } /> );
        const result = await axe( container );

        expect( result ).toHaveNoViolations();
    } );

    it( "respects the x and y prop", () => {
        const { getByText } = renderWithTheme( <Tooltip x={ 50 } y={ 100 }>tooltip</Tooltip> );
        const tooltip = getByText( "tooltip" );

        expect( tooltip ).toHaveStyleRule( "top", "100px" );
        expect( tooltip ).toHaveStyleRule( "left", "50px" );
    } );
} );

describe( "Tooltip.Title", () => {
    it( "renders consistently", () => {
        const { asFragment } = renderWithTheme( <Tooltip.Title>title</Tooltip.Title> );
        const fragment = asFragment();

        expect( fragment ).toMatchSnapshot();
    } );

    it( "should have no axe violations", async () => {
        const { container } = renderWithTheme( <Tooltip.Title>title</Tooltip.Title> );
        const result = await axe( container );

        expect( result ).toHaveNoViolations();
    } );
} );

describe( "Tooltip.Text", () => {
    it( "renders consistently", () => {
        const { asFragment } = renderWithTheme( <Tooltip.Text>text</Tooltip.Text> );
        const fragment = asFragment();

        expect( fragment ).toMatchSnapshot();
    } );

    it( "should have no axe violations", async () => {
        const { container } = renderWithTheme( <Tooltip.Text>text</Tooltip.Text> );
        const result = await axe( container );

        expect( result ).toHaveNoViolations();
    } );
} );
