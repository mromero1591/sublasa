import { userInfo } from "os";

var initalState = {
    signUpActive: false,
    type: '',
    email: '',
    password: '',
    loggedIn: false
}

const UPDATE_ACTIVE_STATE = 'UPDATE_ACTIVE_STATE';
const UPDATE_TYPE = 'UPDATE_TYPE';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_LOGIN = 'UPDATE_LOGIN';

function reducer(state=initalState, action) {
    switch (action.type) {
        case UPDATE_ACTIVE_STATE:
            return {
                ...state,
                signUpActive: action.payLoad
            }
        case UPDATE_TYPE:
            return {
                ...state,
                type: action.payLoad
            }
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payLoad
            }
        case UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payLoad
            }
        case UPDATE_LOGIN:
            return {
                ...state,
                loggedIn: action.payLoad
            }
        default:
            return state
    }
}

export function updateActiveState(signUpActive) {
    return {
        type: UPDATE_ACTIVE_STATE,
        payLoad: signUpActive
    }
}

export function updateType(type) {
    return {
        type: UPDATE_TYPE,
        payLoad: type
    }
}

export function updateEmail(email) {
    return {
        type: UPDATE_EMAIL,
        payLoad: email
    }
}

export function updatePassword(password) {
    return {
        type: UPDATE_PASSWORD,
        payLoad: password
    }
}

export function updateLoggedIn(loggedIn) {
    return {
        type: UPDATE_LOGIN,
        payLoad: {
            ...loggedIn
        }
    }
}

export default reducer;