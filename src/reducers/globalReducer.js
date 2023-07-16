import { GET_TRENDING, LOADING, GET_RANDOM, GET_SEARCH } from "../utils/globalActions";

export const globalReducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case GET_TRENDING:
            return { ...state, loading: false, trending: action.payload };
        case GET_RANDOM:
            return { ...state, loading: false, random: action.payload };
        case GET_SEARCH:
            return { ...state, loading: false, searchResults: action.payload };
        default:
            break;
    }

    return state;
};