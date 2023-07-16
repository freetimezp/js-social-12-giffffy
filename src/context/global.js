import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import { globalReducer } from "../reducers/globalReducer";
import {
    GET_TRENDING,
    LOADING,
    GET_RANDOM,
    GET_SEARCH,
    ADD_TO_FAVOURITES,
    GET_FAVOURITES
} from "../utils/globalActions";
import { useEffect } from "react";

const apiKey = process.env.REACT_APP_GIPHY_API_KEY;
//console.log(apiKey);
const baseUrl = "https://api.giphy.com/v1/gifs";

const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {
    const initialState = {
        loading: false,
        searchResult: [],
        trending: [],
        favourites: [],
        random: {}
    };

    const [state, dispatch] = useReducer(globalReducer, initialState);
    //console.log(state);

    //get trending gifs
    const getTrending = async () => {
        dispatch({ type: LOADING });
        const res = await axios.get(`${baseUrl}/trending?api_key=${apiKey}&limit=30`);

        dispatch({ type: GET_TRENDING, payload: res.data.data });
        //console.log(res.data.data);
    }

    //get random gifs
    const randomGiff = async () => {
        dispatch({ type: LOADING });
        const res = await axios.get(`${baseUrl}/random?api_key=${apiKey}&limit=30`);

        dispatch({ type: GET_RANDOM, payload: res.data.data });
    }

    //get search gifs
    const searchGiff = async (query) => {
        dispatch({ type: LOADING });
        const res = await axios.get(`${baseUrl}/search?api_key=${apiKey}&q=${query}&limit=30`);

        dispatch({ type: GET_SEARCH, payload: res.data.data });
    }

    //save to favourites
    const saveToFavourites = (gif) => {
        const storedItems = JSON.parse(window.localStorage.getItem('favourites')) || [];

        if (!storedItems.some((item) => item.id === gif.id)) {
            const items = [...storedItems, gif];
            window.localStorage.setItem("favourites", JSON.stringify(items));

            dispatch({ type: ADD_TO_FAVOURITES, payload: gif });
            alert("Add to favourites. Success!")
        } else {
            alert("Gif alrady saved.");
        }
    }

    const removeFromLocalStorage = (gif) => {
        const storedItems = JSON.parse(window.localStorage.getItem('favourites')) || [];
        const items = storedItems.filter((item) => item.id !== gif.id);
        window.localStorage.setItem("favourites", JSON.stringify(items));
        alert("Remove from favourites!");

        getFromLocalStorage();
    }

    const getFromLocalStorage = () => {
        const storedItems = JSON.parse(window.localStorage.getItem('favourites')) || [];
        dispatch({ type: GET_FAVOURITES, payload: storedItems });
    }

    //initial renders
    useEffect(() => {
        getTrending();
        randomGiff();
        getFromLocalStorage();
    }, []);
    //console.log(state);

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                randomGiff,
                searchGiff,
                saveToFavourites,
                removeFromLocalStorage
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    return useContext(GlobalContext);
}

