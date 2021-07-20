const initialState = {
    sidebar: false,
}

export default function navBarUserReducer(state = initialState, action) {
    switch (action.type) {
        case "TOGGLENAVUSER": {
            if (state.sidebar) {
                return {
                    ...state,
                    sidebar: false
                }
            } else {
                return {
                    ...state,
                    sidebar: true
                }
            }
        }
        case "CLOSENAVUSER": {
            return {
                ...state,
                sidebar: false
            }
        }
        default:
            return state
    }
}