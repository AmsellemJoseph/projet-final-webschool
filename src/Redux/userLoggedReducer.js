const initialState = {
    logged: false,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case "LOG": {
            return {
                ...state,
                logged: true
            }
        }
        case "DECO":{
            return{
                ...state,
                logged: false,
            }
        }
        default: {
            return state
        }
    }

}
