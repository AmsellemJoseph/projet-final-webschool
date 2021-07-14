const initialState = {
    chatRoomReducer: []
}

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case "GETCHATROOM": {
            return {
                ...state,
                chatRoomReducer: action.payload
            }
        }
        default: {
            return {
                state
            }
        }
    }
}