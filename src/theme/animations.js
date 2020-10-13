import { css } from "styled-components";

export default css`
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale3d(0.75,0.75,1);
        }
        to {
            opacity: 0;
            transform: scale3d(1.5,1.5,1);
        }
    }

    @keyframes fade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
