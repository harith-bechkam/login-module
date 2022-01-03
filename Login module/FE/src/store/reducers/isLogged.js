const defaultState = {
    q: {},
    login: {},
    forgot: {},
    reset: {}
}
const loggedReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_CALLED':
            return { ...state, q: action.data }
        case 'REGISTER_CALLED':
            return { ...state, q: action.data }
        case 'LOGIN_CALLED':
            return { ...state, login: action.data }
        case 'FORGOT_PASSWORD_CALLED':
            return { ...state, forgot: action.data }
        case 'RESET_PASSWORD_CALLED':
            return { ...state, reset: action.data }
        default:
            return state;
    }
}


export default loggedReducer;