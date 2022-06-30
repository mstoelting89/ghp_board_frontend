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
    }
}