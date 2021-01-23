import { SET_SCORE, SET_USER } from '../action-types';

const defaultState = {
    score: 0,
    user: null,
};

function common(state = defaultState, action) {
    if (action.type === SET_SCORE) {
        return {
            ...state,
            score: action.payload.newScore,
        };
    } else if (action.type === SET_USER) {
        return {
            ...state,
            user: action.payload.user,
        }
    }
    return state;
}

export default common;