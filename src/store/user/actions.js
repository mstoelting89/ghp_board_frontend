import userService from "@/service/userService";

export const actions = {
    insertNewUser(state, data) {
        return new Promise(() => {
            userService.insertNewUser(data).then((response) => {
                if (response.status === 200) {
                    state.commit('SET_USER_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: response.data,
                        redirect: ''
                    });
                }
            }).catch((response) => {
                state.commit('SET_USER_MESSAGE_ARRAY', {
                    error: true,
                    success: false,
                    message: response.response.data,
                    redirect: ''
                });
            });
        })
    },
    resetPassword(state, data) {
        return new Promise(() => {
            userService.setNewPassword(data).then((response) => {
                if (response.status === 200) {
                    state.commit('SET_USER_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: response.data,
                        redirect: '/login'
                    });
                }
            }).catch((response) => {
                state.commit('SET_USER_MESSAGE_ARRAY', {
                    error: true,
                    success: false,
                    message: response.response.data,
                    redirect: '/login'
                });
            });
        })
    },
    requestNewPassword(state, data) {
        return new Promise(() => {
            userService.requestNewPassword(data).then((response) => {
                if (response.status === 200) {
                    if (response.status === 200) {
                        state.commit('SET_USER_MESSAGE_ARRAY', {
                            error: false,
                            success: true,
                            message: response.data,
                            redirect: '/login'
                        });
                    }
                }
            }).catch((response) => {
                state.commit('SET_USER_MESSAGE_ARRAY', {
                    error: true,
                    success: false,
                    message: response.response.data,
                    redirect: '/login'
                });
            });
        })
    },
    getAllUser(state) {
        return new Promise(() => {
            userService.getAllUser().then((response) => {
                state.commit('SET_USER_ARRAY', response);
            });
        });
    },
    getUserRolesFromService(state) {
        return new Promise(() => {
            userService.getAllUserRoles().then((response) => {
               state.commit('SET_USER_ROLES', response);
            });
        })
    },
    changeUserLevelOnService(state, data) {
        return new Promise(() => {
            userService.changeUserLevel(data).then((response) => {
                if (response.status === 200) {
                    state.commit('SET_USER_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: response.data,
                        redirect: ''
                    });
                }
            }).catch((response) => {
                state.commit('SET_USER_MESSAGE_ARRAY', {
                    error: true,
                    success: false,
                    message: response.response.data,
                    redirect: ''
                });
            });
        });
    },
    deleteUserOnService(state, data) {
        return new Promise(() => {
            userService.deleteUser(data).then((response) => {
                if (response.status === 200) {
                    state.commit('SET_USER_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: response.data,
                        redirect: ''
                    });
                }
            }).catch((response) => {
                state.commit('SET_USER_MESSAGE_ARRAY', {
                    error: true,
                    success: false,
                    message: response.response.data,
                    redirect: ''
                });
            });
        });
    }
}