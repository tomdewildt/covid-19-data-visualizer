import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { actions } from "./duck";
import { Page, Error, Loading } from "../../components";

const PageMap = ( { dataset, error, LoadDataset } ) => {
    useEffect( () => {
        LoadDataset();
    }, [ LoadDataset ] );

    if ( error ) {
        return (
            <Page id="map">
                <Error message={ error } />
            </Page>
        );
    }
    if ( !dataset ) {
        return (
            <Page id="map">
                <Loading />
            </Page>
        );
    }

    return (
        <Page id="map" />
    );
};

PageMap.propTypes = {
    dataset: PropTypes.shape( {
        data: PropTypes.shape( {
            clear: PropTypes.func.isRequired,
            delete: PropTypes.func.isRequired,
            forEach: PropTypes.func.isRequired,
            get: PropTypes.func.isRequired,
            has: PropTypes.func.isRequired,
            set: PropTypes.func.isRequired,
            size: PropTypes.number.isRequired,
        } ).isRequired,
        dates: PropTypes.arrayOf( PropTypes.string ),
    } ),
    error: PropTypes.string,
    LoadDataset: PropTypes.func.isRequired,
};

PageMap.defaultProps = {
    dataset: null,
    error: null,
};

const mSTP = ( { map: { dataset, error } } ) => ( { dataset, error } );

const mDTP = ( dispatch ) => ( {
    LoadDataset: () => dispatch( actions.loadDataset() ),
} );

export default connect( mSTP, mDTP )( PageMap );
