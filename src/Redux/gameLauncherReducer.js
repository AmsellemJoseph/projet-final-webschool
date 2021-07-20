const initialState = {
    race: false,
    clicker: false,
    moreOrLess: false,
}

export default function gameLauncherReducer(state = initialState, action) {
    switch (action.type) {
        case "SETRACE": {
            return {
                ...state,
                race: true,
                clicker: false,
                moreOrLess: false,
            }
        }
        case "SETCLICKER": {
            return {
                ...state,
                race: false,
                clicker: true,
                moreOrLess: false,
            }
        }
        case "SETMOREORLESS": {
            return {
                ...state,
                race: false,
                clicker: false,
                moreOrLess: true,
            }
        }
        case "RESETGAME": {
            return {
                ...state,
                race: false,
                clicker: false,
                moreOrLess: false,
            }
        }
        default:
            return state
    }
}