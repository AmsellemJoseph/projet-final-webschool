const initialState = {
    nbrHorse: ""
}

export default function horseReducer(state = initialState, action) {
    switch (action.type) {
        case "SETHORSEGAME": {
            return {
                ...state,
                nbrHorse: action.payload
            }
        }
        default:
            return state
    }
}