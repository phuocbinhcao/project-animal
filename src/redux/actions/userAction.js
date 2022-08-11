import * as types from './actionTypes'

export const actLogin = (payload) => {
    return {
        type: types.USER_LOGIN,
        payload: payload
    }
}

export const actLogout = () => {
    return {
        type: types.USER_LOGOUT,
    }
}