import { SET_SCORE, SET_USER } from '../action-types';

export const setScore = payload => {
    return {
        type: SET_SCORE,
        payload
    };
};

export const setUser = payload => {
    return {
        type: SET_USER,
        payload
    };
};