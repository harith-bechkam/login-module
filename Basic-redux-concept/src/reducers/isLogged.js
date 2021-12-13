const loggedReducer = (state = "start", action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return "hi";
        case 'NOT_SIGN_IN':
            return "not hi";
        default:
            return state;
    }
}


export default loggedReducer;