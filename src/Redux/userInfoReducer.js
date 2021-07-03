const initialState = {
    user: ""
}

export default function userInfoReducer(state = initialState, action) {
    switch (action.type) {
        case "CREATE": {
            return {
                ...state,
                user: action.payload
            }
        }
        case "DESTROY": {
            return {
                ...state,
                user: ""
            }
        }
        default: {
            return state
        }
    }
}