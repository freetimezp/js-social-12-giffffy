import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';

import { useGlobal } from '../context/global';
import GiffItem from '../Components/GiffItem';
import Loader from '../Components/Loader';
import { useTheme } from '../context/themeContext';

const trend = <i className='fa-solid fa-arrow-trend-up'></i>

const Trending = () => {
    const { trending, loading } = useGlobal();
    //console.log(trending);

    const theme = useTheme();

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <TrendingStyled theme={theme}>
            <h2>{trend} Trending</h2>

            {loading && <Loader />}

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className='my-masonry-grid'
                columnClassName='my-masonry-grid_column'
            >
                {trending?.map((giff, index) => (
                    <GiffItem key={index} giffItem={giff} {...giff} />
                ))}
            </Masonry>
        </TrendingStyled>
    );
};

const TrendingStyled = styled.article`
    padding: 2rem;
    background-color: ${props => props.theme.colorBg2};
    border-radius: 1rem;

    h2 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        color: ${props => props.theme.colorWhite};
        display: flex;
        align-items: center;
        gap: 1rem;

        i {
            background: linear-gradient(
                    to right, 
                    ${props => props.theme.colorYellow},
                    ${props => props.theme.colorGreen2});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    .my-masonry-grid {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin-left: -20px;
        width: auto;
    }

    .my-masonry-grid_column {
        padding-left: 20px;
        background-clip: padding-box;
    }

    .my-masonry-grid_column > div {
        margin-bottom: 20px;
    }

`;

export default Trending;
