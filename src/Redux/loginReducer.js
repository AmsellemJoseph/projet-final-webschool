const initialState = {
    showLogin: false,
    showRegister: false,
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLELOGIN': {
            if (state.showLogin) {
                return {
                    ...state,
                    showLogin: false,
                    showRegister: false
                }
            } else {
                return {
                    ...state,
                    showLogin: true,
                    showRegister: false
                }
            }
        }
        case 'TOGGLEREG': {
            if (state.showLogin) {
                return {
                    ...state,
                    showLogin: false,
                    showRegister: false,
                }
            } else {
                return {
                    ...state,
                    showLogin: false,
                    showRegister: true
                }
            }
        }
        case 'CLOSEALL': {
            return {
                ...state,
                showLogin: false,
                showRegister: false,
            }
        }
        default:{
            return state;
        }
    }
}