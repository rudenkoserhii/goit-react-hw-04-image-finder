import styled from 'styled-components';

export const Wrap = styled.div`

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${p => p.theme.space[4]}px;
`;


export const ErrorMessage = styled.p`
    font-family: inherit;
    font-size: 18px;
    line-height: 24px;
    font-style: normal;
    font-weight: 500;

    text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;



    text-align: center;
    margin: ${p => p.theme.space[4]}px;
`;
