import instrumentsService from "@/service/instrumentsService";

export const actions = {
    getInstrumentsFromService(state) {
        return new Promise(() => {
            instrumentsService.getInstruments().then((response) => {
                state.commit('GET_INSTRUMENTS', response)
            })
        })
    },
    insertInstrument(state, payload) {
        return new Promise(() => {
            instrumentsService.insertInstrument(payload).then((response) => {
                state.commit('GET_INSTRUMENTS_INSERT', response);
            })
        })
    }
}