// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledEntityAdd {
    theme: Theme;
}

export const StyledEntityAdd = styled.div<IStyledEntityAdd>`
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 700px;
`;
// #endregion module
