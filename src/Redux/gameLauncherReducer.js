const initialState = {
    race: false,
    clicker: false,
}

export default function gameLauncherReducer(state = initialState, action) {
    switch (action.type) {
        case "SETRACE": {
            return {
                ...state,
                race: true,
                clicker:false
            }
        }
        case "SETCLICKER":{
            return{
                ...state,
                race:false,
                clicker:true,
            }
        }
        case "RESETGAME":{
            return{
                ...state,
                race:false,
                clicker:false
            }
        }
        default:
            return {
                state
            }
    }
}