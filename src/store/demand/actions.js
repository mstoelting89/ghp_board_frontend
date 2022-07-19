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
                if (response.status === 200) {
                    state.commit('SET_DEMAND_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Die Anfrage wurde erfolgreich gespeichert.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_DEMAND_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Speichern der Anfrage ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        })
    },
    updateDemandEntry(state, payload) {
        return new Promise(() => {
            demandService.updateDemandEntry(payload).then((response) => {
                state.commit('GET_DEMAND_UPDATE', response);
                if (response.status === 200) {
                    state.commit('SET_DEMAND_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Die Anfrage wurde erfolgreich aktualisiert.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_DEMAND_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Aktualisieren der Anfrage ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        })
    },
    deleteDemandEntry(state, payload) {
        return new Promise(() => {
            demandService.deleteDemandEntry(payload).then((response) => {
                state.commit('GET_DEMAND_DELETE', response);
                if (response.status === 200) {
                    state.commit('SET_DEMAND_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Die Anfrage wurde erfolgreich gelöscht.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_DEMAND_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Löschen der Anfrage ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        })
    },
    setDemandVote(state, payload) {
        return new Promise(() => {
            demandService.setDemandLike(payload).then((response) => {
               state.commit('SET_DEMAND_VOTES', response);
            });
        });
    },
    getDemandVote(state, payload) {
        return new Promise(() => {
            demandService.getDemandLikes(payload).then((response) => {
                state.commit('GET_DEMAND_VOTES', response);
            })
        })
    }
}