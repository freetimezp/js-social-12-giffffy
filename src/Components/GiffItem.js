import React, { useState } from 'react';
import styled from 'styled-components';

import { useTheme } from '../context/themeContext';
import Modal from './Modal';
import { useGlobal } from '../context/global';
import Loader from './Loader';

const GiffItem = ({
    id,
    title,
    embed_url,
    url: link,
    images: {
        original: { url }
    },
    rendered
}) => {
    const theme = useTheme();
    const [modal, setModal] = useState(false);
    const { loading, saveToFavourites, removeFromLocalStorage } = useGlobal();

    return (
        <GiffsStyled theme={theme}>
            {modal && (
                <Modal
                    title={title}
                    giff={url}
                    link={link}
                    embed_url={embed_url}
                    setModal={setModal}
                />
            )}

            {loading ? (
                <Loader />
            ) : (
                <div className='gif' onDoubleClick={() => setModal(true)}>
                    <img src={url} alt={title} />
                    <div
                        className='love'
                        onClick={() => {
                            if (rendered === 'liked') {
                                removeFromLocalStorage();
                            } else {
                                saveToFavourites({
                                    id,
                                    title,
                                    url: link,
                                    images: {
                                        original: { url }
                                    }
                                });
                            }
                        }}
                    >
                        <i className={rendered === 'liked' ? 'fa-solid fa-x' : 'fa-solid fa-heart'}></i>
                    </div>
                </div>
            )}
        </GiffsStyled>
    );
};

const GiffsStyled = styled.div`
    .gif {
        position: relative;

        img {
            width: 100%;
            border-radius: 5px;
        }

        .love {
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;

            i {
                font-size: 1.8rem;
                background: linear-gradient(
                    to right, 
                    ${props => props.theme.colorYellow},
                    ${props => props.theme.colorGreen2});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                transition: all 0.3s ease-in-out;
            }

            &:hover {
                transform: scale(1.17);
                transition: all 0.3s ease-in-out;
            }
        }
    }
`;

export default GiffItem;
