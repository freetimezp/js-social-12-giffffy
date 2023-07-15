import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import { globalReducer } from "../reducers/globalReducer";
import { GET_TRENDING, LOADING, GET_RANDOM } from "../utils/globalActions";
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

    //initial renders
    useEffect(() => {
        getTrending();
        randomGiff();
    }, []);
    //console.log(state);

    return (
        <GlobalContext.Provider value={{ ...state, randomGiff }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    return useContext(GlobalContext);
}

