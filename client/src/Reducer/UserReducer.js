import { userActionTypes } from "../Actions/UserActions"

const initialState = {
    userRegistered:null,
    user:null
}
export const userReducer = (state=initialState,action) => {
    switch(action.type){
        case userActionTypes.LOGIN_USER_SUCCESS:
            return {...state,user:action.payload}
        case userActionTypes.LOGIN_USER_ERROR:
            return {...state,user:action.payload}
        case userActionTypes.REGISTER_USER_SUCCESS:
            return {...state,userRegistered:action.payload}
        case userActionTypes.REGISTER_USER_ERROR:
            return {...state,userRegistered:action.payload}
        case userActionTypes.RESET_REGISTER_USER:
            return {...state,userRegistered:null}
        case userActionTypes.RESET_LOGIN_USER:
            return {...state,user:null}
        case userActionTypes.LOGOUT_USER:
            return {...state,user:null}
        default:
            return state
    }
}

