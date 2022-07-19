export const getters = {
    getDemand: state => state.demandArray,
    getDemandDetail: state => state.demandDetail,
    getDemandInsert: state => state.demandInsert,
    getDemandUpdate: state => state.demandUpdate,
    getDemandDelete: state => state.demandDelete,
    getDemandVotes: state => state.demandVotes,
    setDemandVotes: state => state.setDemandVotes,
    getDemandMessage: state => state.demandMessageArray
}