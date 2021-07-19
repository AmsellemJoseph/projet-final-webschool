const initialState ={
    clickCount:0
}

export default function clickerReducer (state = initialState,action){

    switch(action.type){
        case "ADDCLICKGAME":{
            return{
                ...state,
                clickCount:state.clickCount+1
            }
        }
        default:{
            return state
        }
    }

}