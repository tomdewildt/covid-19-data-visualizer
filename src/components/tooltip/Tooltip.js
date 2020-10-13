import styled from "styled-components";
import PropTypes from "prop-types";

const Tooltip = styled.div`
    position: absolute; 
    top: ${ ( { y } ) => y }px;
    left: ${ ( { x } ) => x }px;
    min-width: 160px; 
    max-height: 240px;
    padding: ${ ( { theme } ) => theme.dimens.spacing[ 2 ] };
    border-radius: ${ ( { theme } ) => theme.dimens.borderRadius };
    background: ${ ( { theme } ) => theme.colors.black };
    color: ${ ( { theme } ) => theme.colors.white };
    z-index: 10;
`;
Tooltip.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

const TooltipTitle = styled.h1`
    margin: ${ ( { theme } ) => `0 0 ${ theme.dimens.spacing[ 2 ] } 0` };
    font-size: ${ ( { theme } ) => theme.typography.fontSize };
`;

const TooltipText = styled.p`
    margin: 0;
    font-size: ${ ( { theme } ) => `calc(${ theme.typography.fontSize } * 0.75)` };
`;

Tooltip.Title = TooltipTitle;
Tooltip.Text = TooltipText;

export default Tooltip;
