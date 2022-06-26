import demandService from "@/service/demandService";

export const actions = {
    getDemand() {
        return new Promise((resolve) => {
            demandService.getDemand().then((response) => {
                resolve(response);
            })
        })
    },
    getDemandDetail({ commit }, payload) {
        return new Promise((resolve) => {
            demandService.getDemandDetail(payload).then((response) => {
                commit('DEMAND_DETAIL', response);
                resolve(response);
            })
        })
    }
}