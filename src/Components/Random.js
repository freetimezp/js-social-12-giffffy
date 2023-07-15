import React from 'react';
import styled from 'styled-components';

import { useTheme } from '../context/themeContext';
import { useGlobal } from '../context/global';
import Loader from './Loader';
import GiffItem from './GiffItem';

function Random() {
    const { random, loading } = useGlobal();
    const theme = useTheme();

    return (
        <RandomStyled theme={theme}>
            {loading ? (
                <Loader />
            ) : (
                <GiffItem {...random} />
            )}
        </RandomStyled>
    );
};

const RandomStyled = styled.div`
    padding: 2rem;
    background-color: ${props => props.theme.colorBg2};
    border-radius: 1rem;
    width: 50%;
    margin: 0 auto;
`;


export default Random;
