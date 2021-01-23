import { SET_MEME, SET_USER, UPDATE_POSTS } from '../actions';

const defaultState = {
    user: null,
    updatePosts: true,
    firebase: null,
    meme: null,
    memesList: null
};

function common(state = defaultState, action) {
    if (action.type === SET_USER) {
        return {
            ...state,
            user: action.payload.user,
        }
    } else if (action.type === UPDATE_POSTS) {
        return {
            ...state,
            updatePosts: action.payload.update
        }
    } else if (action.type === SET_MEME) {
        return {
            ...state,
            meme: action.payload.meme
        }
    }
    return state;
}

export default common;