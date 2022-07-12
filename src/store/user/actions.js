import userService from "@/service/userService";

export const actions = {
    insertNewUser(state, data) {
        return new Promise(() => {
            userService.insertNewUser(data).then((response) => {
                console.log(response);
            })
        })
    }
}