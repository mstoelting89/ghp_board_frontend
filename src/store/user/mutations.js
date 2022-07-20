export const mutations = {
    SET_USER_MESSAGE_ARRAY(state, payload) {
        state.userMessageArray = payload;
    },
    SET_USER_ARRAY(state, payload) {
        state.userArray = payload;
    },
    SET_USER_ROLES(state, payload) {
        state.userRoles = payload;
    }
}