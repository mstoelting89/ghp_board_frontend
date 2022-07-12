export const mutations = {
    LOGGED_IN(state, payload) {
        state.loggedIn = payload
    },
    GET_ERROR_MSG(state, payload) {
        state.errorMsg = payload;
    },
    GET_USER_EMAIL(state, payload) {
        state.userEmail = payload;
    },
    GET_USER_LEVEL(state, payload) {
        state.userLevel = payload;
    }
}