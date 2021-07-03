const initialState = {
    logged: false,
    admin: false
}

export default function userLoggedReducer(state = initialState, action) {
    switch (action.type) {
        case "LOG": {
            return {
                ...state,
                logged: true
            }
        }
        case "DECO": {
            return {
                ...state,
                logged: false,
            }
        }
        case "ADMINON": {
            return {
                ...state,
                admin: true,
                logged: true,
            }
        }
        case "SECURITY": {
            return {
                ...state,
                logged: false,
                admin: false,
            }
        }
        default: {
            return state
        }
    }

}
