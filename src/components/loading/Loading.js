import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as Loader } from "../../assets/loader.svg";

const LoadingWrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: ${ ( { theme } ) => theme.colors.black };
`;

const LoaderIcon = styled( Loader )`
    height: 3rem;
    overflow: visible;
    stroke: ${ ( { theme } ) => theme.colors.greyLight };

    line { 
        animation: fade 0.8s linear infinite;
    }

    line:nth-child(1) { animation-delay: -0.7s; }
    line:nth-child(2) { animation-delay: -0.6s; }
    line:nth-child(3) { animation-delay: -0.5s; }
    line:nth-child(4) { animation-delay: -0.4s; }
    line:nth-child(5) { animation-delay: -0.3s; }
    line:nth-child(6) { animation-delay: -0.2s; }
    line:nth-child(7) { animation-delay: -0.1s; }
    line:nth-child(8) { animation-delay: 0s; }
`;

const LoadingMessage = styled.p`
    margin: ${ ( { theme } ) => theme.dimens.spacing[ 4 ] };
    color: ${ ( { theme } ) => theme.colors.greyLight };
`;

const Loading = ( { title, message } ) => (
    <LoadingWrapper>
        <LoaderIcon title={ title } />
        <LoadingMessage>{ message }</LoadingMessage>
    </LoadingWrapper>
);

Loading.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
};

Loading.defaultProps = {
    title: "loading icon",
    message: "Loading...",
};

export default Loading;
