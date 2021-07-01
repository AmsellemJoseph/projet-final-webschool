const initialState = {
    username: ""
}

export default function userInfoReducer(state = initialState, action) {
    switch (action.type) {
        case "CREATE": {
            return {
                ...state,
                username: action.payload
            }
        }
        case "DESTROY": {
            return {
                ...state,
                username: ""
            }
        }
        default: {
            return state
        }
    }
}