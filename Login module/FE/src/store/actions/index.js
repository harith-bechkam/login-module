// import axios from "axios"
import API from '../../api'



//EASY WAY FOR API CALL
// export const apicall = () => {
//     return dispatch => {
//         return axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
//             dispatch({ type: "GET_CALLED", data: response.data });
//         })
//     }
// }

// export const apicall = (self, datas) => {
//     return dispatch => {
//         return axios.post('https://heroku-resource-login-module.herokuapp.com/api/user/register', {
//             name: datas.name,
//             email: datas.email,
//             password: datas.password
//         }).then((response) => {
//             console.log(self)
//             console.log(datas)
//             dispatch({ type: "POST_CALLED", data: response.data });
//         })
//     }
// }





export const register = (self, data) => {
    return async dispatch => {
        API.post(`/api/auth/register`, data)
            .then(async (msg) => {
                if (msg.success === true) {
                    //api call is success
                    localStorage.removeItem("auth-token")
                    localStorage.setItem("auth-token", JSON.stringify(msg.accessToken))
                    localStorage.setItem("user-id", msg.registeredUserId)

                    self.setState({ error_text: false })
                    dispatch({ type: "REGISTER_CALLED", data: msg });
                    self.props.history.push("/content")
                }
            })
            .catch(err => {
                //promise rejection will catch here (or) api call throws error
                self.setState({ error_text: err.error })
            })

    }
}

export const login = (self, data) => {
    return async dispatch => {
        API.post(`/api/auth/login`, data)
            .then(async (msg) => {
                if (msg.success === true) {
                    //api call is success
                    localStorage.removeItem("auth-token")
                    localStorage.setItem("auth-token", JSON.stringify(msg.accessToken))
                    localStorage.setItem("user-id", msg.loginUserId)

                    // self.setState({ error_text: false })
                    dispatch({ type: "LOGIN_CALLED", data: msg });
                    self.props.history.push("/content")
                }
            })
            .catch(err => {
                //promise rejection will catch here (or) api call throws error
                self.setState({ error_text: err.error })
                // console.log(err)
            })

    }
}


export const forgotPassword = (self, data) => {
    return async dispatch => {
        API.post(`/api/auth/forgotpassword`, data)
            .then(async (msg) => {
                if (msg.success === true) {
                    //api call is success

                    self.setState({ error_text: false })
                    dispatch({ type: "FORGOT_PASSWORD_CALLED", data: msg });
                    // self.props.history.push("/")
                }
            })
            .catch(err => {
                //promise rejection will catch here (or) api call throws error
                self.setState({ error_text: err.error })
            })

    }
}

export const resetPassword = (self, data) => {
    return async dispatch => {
        API.put(`/api/auth/resetPassword/${self.props.match.params.resetToken}`, data)
            .then(async (msg) => {
                if (msg.sucess === "true") {
                    //api call is success

                    self.setState({ error_text: false })
                    dispatch({ type: "RESET_PASSWORD_CALLED", data: msg });
                    // self.props.history.push("/")
                }
            })
            .catch(err => {
                //promise rejection will catch here (or) api call throws error
                self.setState({ error_text: err.error })
            })

    }
}