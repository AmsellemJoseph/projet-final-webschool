const initialState = {
    miseMoreOrLess: 0,
    countMore: 15,
}

export default function moreOrLessReducer(state = initialState, action) {

    switch (action.type) {

        case "MISEMOREORLESS": {
            return {
                ...state,
                miseMoreOrLess: action.payload,
            }
        }
        case "COUNTLEFT": {
            return {
                ...state,
                countMore: state.countMore - 1
            }
        }
        case "RESETMORE": {
            return {
                ...state,
                countMore: 15
            }
        }
        default:
            return state
    }
}