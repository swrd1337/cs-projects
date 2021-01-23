import { SET_MEME, SET_USER, UPDATE_POSTS } from '../actions';

export const setUser = payload => {
    return {
        type: SET_USER,
        payload
    };
};

export const updatePosts = payload => {
    return {
        type: UPDATE_POSTS,
        payload
    };
};

export const setMeme = payload => {
    return {
        type: SET_MEME,
        payload
    };
};
