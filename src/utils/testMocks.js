/* eslint-disable react/function-component-definition, react/prop-types */
import React from "react";

// Components
jest.mock( "@deck.gl/react", () => ( { children } ) => (
    <mock-deckgl>{ children }</mock-deckgl>
) );

jest.mock( "react-map-gl", () => ( {
    Map: ( { children } ) => (
        <mock-mapgl>{ children }</mock-mapgl>
    ),
} ) );

// Assets
jest.mock( "../assets/gemeenten.json", () => ( [
    {
        type: "Feature",
        properties: { Gemeente: "Gemeente 1", Gemeentecode: 1, Coordinaten: [] },
        geometry: { type: "MultiPolygon", coordinates: [] },
    },
    {
        type: "Feature",
        properties: { Gemeente: "Gemeente 2", Gemeentecode: 2, Coordinaten: [] },
        geometry: { type: "MultiPolygon", coordinates: [] },
    },
    {
        type: "Feature",
        properties: { Gemeente: "Gemeente 3", Gemeentecode: 3, Coordinaten: [] },
        geometry: { type: "MultiPolygon", coordinates: [] },
    },
] ) );
