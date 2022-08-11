import * as types from '../actions/actionTypes';

const initialState = {
    users: [],
    isLogIn: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            return {
                ...state,
                users: action.payload,
                isLogIn: true,
            };
        case types.USER_LOGOUT:
            return { ...state, users: '', isLogIn: false };

        default:
            return { ...state };
    }
}