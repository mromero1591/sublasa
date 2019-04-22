//set inital state
var initalState = {
    newsletters: []
}


const UPDATE_NEWSLETTERS = 'UPDATE_NEWSLETTERS';

function reducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_NEWSLETTERS:
            return {
                newsletters: action.payLoad
            }
        default:
            return state;
    }
}

export function updateNewsLetters(newsletters) {
    return {
        type: UPDATE_NEWSLETTERS,
        payLoad: newsletters
    }
}

export default reducer;