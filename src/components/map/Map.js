import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { Map as MapGL } from "react-map-gl";
import PropTypes from "prop-types";

import Tooltip from "../tooltip/Tooltip";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN;
const MAPBOX_STYLE = process.env.REACT_APP_MAPBOX_STYLE;

const Map = ( { data, viewState } ) => {
    const [ tooltip, setTooltip ] = useState( {} );

    const layers = [
        new GeoJsonLayer( {
            data,
            opacity: 0.8,
            extruded: false,
            filled: true,
            stroked: true,
            pickable: true,
            getFillColor: [ 128, 128, 128, 0 ],
            getLineColor: [ 128, 128, 128, 255 ],
            lineWidthMinPixels: 1,
            lineWidthMaxPixel: 1,
            onHover: ( { x, y, object } ) => setTooltip( { x, y, object } ),
        } ),
        new HeatmapLayer( {
            data,
            getPosition: ( d ) => d.properties.Coordinaten,
            getWeight: ( d ) => d.properties.PositiefGetest,
            intensity: 1,
            treshold: 0.05,
            radiusPixels: 75,
        } ),
    ];

    return (
        <DeckGL
            controller
            layers={ layers }
            initialViewState={ viewState }
            onViewStateChange={ () => setTooltip( {} ) }
        >
            <MapGL
                reuseMaps
                preventStyleDiffing
                mapStyle={ MAPBOX_STYLE }
                mapboxApiAccessToken={ MAPBOX_TOKEN }
            />
            { tooltip.object && (
                <Tooltip
                    aria-labelledby="tooltip-title"
                    x={ tooltip.x }
                    y={ tooltip.y }
                >
                    <Tooltip.Title id="tooltip-title">
                        { tooltip.object.properties.Gemeente }
                    </Tooltip.Title>
                    <Tooltip.Text>
                        <b>Code: </b>
                        { tooltip.object.properties.Gemeentecode }
                    </Tooltip.Text>
                    <Tooltip.Text>
                        <b>Positief Getest: </b>
                        { tooltip.object.properties.PositiefGetest }
                    </Tooltip.Text>
                    <Tooltip.Text>
                        <b>Datum: </b>
                        { tooltip.object.properties.Datum }
                    </Tooltip.Text>
                </Tooltip>
            )}
        </DeckGL>
    );
};

Map.propTypes = {
    data: PropTypes.arrayOf( PropTypes.shape( {} ) ).isRequired,
    viewState: PropTypes.shape( {
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
        pitch: PropTypes.number,
        bearing: PropTypes.number,
    } ).isRequired,
};

export default Map;
