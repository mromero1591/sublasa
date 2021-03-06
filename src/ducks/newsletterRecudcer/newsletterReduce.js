//set inital state
var initalState = {
    newsletters: [],
    subscribedNewsLetters: [],
    topics: []
}


const UPDATE_NEWSLETTERS = 'UPDATE_NEWSLETTERS';
const UPDATE_SUBSCRIBED = 'UPDATE_SUBSCRIBED';
const UPDATE_TOPICS = 'UPDATE_TOPICS';

function reducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_NEWSLETTERS:
            return {
                ...state,
                newsletters: action.payLoad
            }
        case UPDATE_SUBSCRIBED:
            return {
                ...state,
                subscribedNewsLetters: [...action.payLoad]
            }
        case UPDATE_TOPICS:
            return {
                ...state,
                topics: action.payLoad
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

export function updateSubscribed(newsletters) {
    return {
        type: UPDATE_SUBSCRIBED,
        payLoad: newsletters
    }
}

export function updateTopics(topics) {
    return {
        type: UPDATE_TOPICS,
        payLoad: topics
    }
}

export default reducer;