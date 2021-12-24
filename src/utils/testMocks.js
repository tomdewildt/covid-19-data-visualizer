/* eslint-disable react/prop-types */
import React from "react";

// Components
jest.mock( "@deck.gl/react", () => ( { children } ) => (
    <mock-deckgl>{ children }</mock-deckgl>
) );

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

