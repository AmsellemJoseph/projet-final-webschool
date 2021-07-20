const initialState = {
    showLogin: false,
    showRegister: false,
    showForgot:false
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLELOGIN': {
            if (state.showLogin) {
                return {
                    ...state,
                    showLogin: false,
                    showRegister: false,
                    showForgot:false
                }
            } else {
                return {
                    ...state,
                    showLogin: true,
                    showRegister: false,
                    showForgot:false
                }
            }
        }
        case 'TOGGLEREG': {
            if (state.showRegister) {
                return {
                    ...state,
                    showLogin: false,
                    showRegister: false,
                    showForgot:false
                }
            } else {
                return {
                    ...state,
                    showLogin: false,
                    showRegister: true,
                    showForgot:false
                }
            }
        }
        case 'TOGGLEFORGOT':{
            if(state.showForgot){
                return{
                    ...state,
                    showLogin: false,
                    showRegister: false,
                    showForgot:false
                }
            }else{
                return{
                    ...state,
                    showLogin: false,
                    showRegister: false,
                    showForgot:true
                }
            }
        }
        case 'CLOSEALL': {
            return {
                ...state,
                showLogin: false,
                showRegister: false,
                showForgot:false
            }
        }
        default:
            return state
    }
}