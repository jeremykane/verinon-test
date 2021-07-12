import axios from 'axios'
import { BACKEND_URL } from '../Constants.js'

class AuthenticationService {

    authenticate(userInfo) {
        return axios.post(`${BACKEND_URL}/login`, userInfo)
    }

    registerSuccessfulLogin(username) {
        sessionStorage.setItem("current_user", username)
    }

    forgotPassword(username, password) {
        return axios.post(`${BACKEND_URL}/forgot-password`, username, password)
    }

    getUsers(username) {
        return axios.post(`${BACKEND_URL}/find-password`, username)
    }

    getAllUsers() {
        return axios.get(`${BACKEND_URL}/get-users`)
    }

    getCurrentUser() {
        return sessionStorage.getItem("current_user")
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("current_user")
        if (user === null) return false
        return true
    }

    logout() {
        sessionStorage.removeItem("current_user")
    }

}

export default new AuthenticationService();