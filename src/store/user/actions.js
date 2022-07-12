import authService from "@/service/authService";

export const actions = {
    insertNewUser(state, data) {
        return new Promise(() => {
            authService.insertNewUser(data).then((response) => {
                console.log(response);
            })
        })
    }
}