import { userInfo } from "os";

var initalState = {
    signUpActive: false,
    type: '',
    email: '',
    password: '',
    user: {
        id: -1,
        email: '',
        lastLogin: ''
    }
}

const UPDATE_ACTIVE_STATE = 'UPDATE_ACTIVE_STATE';
const UPDATE_TYPE = 'UPDATE_TYPE';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_USER = 'UPDATE_USER';

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
        case UPDATE_USER:
            return {
                ...state,
                user: {
                    id: action.payLoad.id,
                    email: action.payLoad.email,
                    lastLogin: action.payLoad.lastLogin
                }
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

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payLoad: {
            ...user
        }
    }
}

export default reducer;