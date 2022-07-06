import demandService from "@/service/demandService";

export const actions = {
    getDemandFromService(state) {
        return new Promise(() => {
            demandService.getDemand().then((response) => {
                state.commit('GET_DEMAND', response)
            })
        })
    },
    getDemandDetailFromService(state, payload) {
        return new Promise(() => {
            demandService.getDemandDetail(payload).then((response) => {
                state.commit('GET_DEMAND_DETAIL', response);
            });
        });
    },
    insertNewDemandEntry(state, payload) {
        return new Promise(() => {
            demandService.insertDemandEntry(payload).then((response) => {
                state.commit('GET_DEMAND_INSERT', response);
            })
        })
    },
    updateDemandEntry(state, payload) {
        return new Promise(() => {
            demandService.updateDemandEntry(payload).then((response) => {
                state.commit('GET_DEMAND_UPDATE', response)
            })
        })
    },
    deleteDemandEntry(state, payload) {
        return new Promise(() => {
            demandService.deleteDemandEntry(payload).then((response) => {
                state.commit('GET_DEMAND_DELETE', response)
            })
        })
    }
}