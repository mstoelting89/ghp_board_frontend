import userService from "@/service/userService";

export const actions = {
    insertNewUser(state, data) {
        return new Promise(() => {
            userService.insertNewUser(data).then((response) => {
                if (response.status === 200) {
                    // show modal (2 sec) with success msg
                } else {
                    // show modal (2 sec) with error msg
                }
            })
        })
    },
    resetPassword(state, data) {
        return new Promise(() => {
            userService.setNewPassword(data).then((response) => {
                if (response.status === 200) {
                    // redirect to login page
                    // show modal (2 sec) with success msg
                } else {
                    // redirect to login page
                    // show modal (2 sec) with error msg
                }
            });
        })
    },
    requestNewPassword(state, data) {
        return new Promise(() => {
            userService.requestNewPassword(data).then((response) => {
                if (response.status === 200) {
                    // redirect to login page
                    // show modal (2 sec) with success msg
                } else {
                    // redirect to login page
                    // show modal (2 sec) with error msg
                }
            })
        })
    }
}