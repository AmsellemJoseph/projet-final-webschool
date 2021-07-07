const initialState = {
    loadRegister:false
}

export default function loadingReducer(state=initialState, action){

    switch(action.type){
        case "LOADING":{
            return{
                ...state,
                loadRegister:true
            }
        }
        case "LOADED":{
            return{
                ...state,
                loadRegister:false
            }
        }
        default:
            return state
    }
}