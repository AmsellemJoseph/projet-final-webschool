const initialState = {
    race: false
}

export default function gameLauncherReducer(state = initialState, action) {
    switch (action.type) {
        case "SETRACE": {
            return {
                ...state,
                race: true
            }
        }
        case "RESETGAME":{
            return{
                ...state,
                race:false
            }
        }
        default:
            return {
                state
            }
    }
}