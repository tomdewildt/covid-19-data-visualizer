import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as Alert } from "../../assets/alert.svg";

const ErrorWrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: ${ ( { theme } ) => theme.colors.black };
`;

const AlertIcon = styled( Alert )`
    height: 3rem;
    overflow: visible;
    stroke: ${ ( { theme } ) => theme.colors.greyLight };

    polygon {
        transform-origin: center;
        animation: ripple 3s infinite;
    }
`;

const ErrorMessage = styled.p`
    margin: ${ ( { theme } ) => theme.dimens.spacing[ 4 ] };
    color: ${ ( { theme } ) => theme.colors.greyLight };
`;

const Error = ( { title, message } ) => (
    <ErrorWrapper>
        <AlertIcon title={ title } />
        <ErrorMessage>{ message }</ErrorMessage>
    </ErrorWrapper>
);

Error.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
};

Error.defaultProps = {
    title: "error icon",
    message: "An unexpected error occurred.",
};

export default Error;
