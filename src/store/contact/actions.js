
import contactService from "@/service/contactService";

export const actions = {
    sendContactMail(state, data) {
        return new Promise(() => {
            contactService.sendContactMail(data).then((response) => {
                state.commit('SET_CONTACT_MESSAGE', response.data);
            });
        });
    }
}