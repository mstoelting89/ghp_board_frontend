export const mutations = {
    GET_INSTRUMENTS(state, payload) {
        state.instrumentsArray = payload;
    },
    GET_INSTRUMENTS_INSERT(state, payload) {
        state.instrumentInsert = payload;
    }
}