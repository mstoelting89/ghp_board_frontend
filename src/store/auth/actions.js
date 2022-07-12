import authService from "@/service/authService";

export const actions = {
    login(state, data) {
        return new Promise(() => {
            authService.login(data).then((response) => {
                if (response.data.token !== null) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userRole', response.data.role[0].authority)
                    localStorage.setItem('userEmail', response.data.email)
                    state.commit("LOGGED_IN", true);
                    state.commit("GET_ERROR_MSG", '');
                    state.commit("GET_USER_EMAIL", response.data.email)
                    state.commit("GET_USER_LEVEL", response.data.role[0].authority)
                }

            }).catch((response) => {
                state.commit("GET_ERROR_MSG", response.response.data)
                state.commit("LOGGED_IN", false);
            })
        })
    },
    logout(state) {
        return new Promise(() => {
           localStorage.removeItem('token');
           localStorage.removeItem('userRole');
           localStorage.removeItem('userEmail');
           state.commit("LOGGED_IN", false);
        });
    },
    resetPassword(state, data) {
        console.log(data);
        return new Promise(() => {
            authService.setNewPassword(data).then((response) => {
                console.log(response);
            })
        })
    }
}