export const mutations = {
    GET_DEMAND(state, payload) {
        state.demandArray = payload;
    },
    GET_DEMAND_DETAIL(state, payload) {
        state.demandDetail = payload;
    },
    GET_DEMAND_INSERT(state, payload) {
        state.demandInsert = payload;
    },
    GET_DEMAND_DELETE(state, payload) {
        state.demandDelete = payload;
    },
    GET_DEMAND_UPDATE(state, payload) {
        state.demandUpdate = payload;
    }
}