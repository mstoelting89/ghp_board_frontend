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
                if (response.status === 200) {
                    state.commit('SET_INSTRUMENT_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Das Instrument wurde erfolgreich gespeichert.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_INSTRUMENT_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Speichern des Instrumentes ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        })
    },
    deleteInstrumentEntry(state, payload) {
        return new Promise(() => {
            instrumentsService.deleteInstrumentEntry(payload).then((response) => {
                state.commit('GET_INSTRUMENT_DELETE', response);
                if (response.status === 200) {
                    state.commit('SET_INSTRUMENT_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Das Instrument wurde erfolgreich gelöscht.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_INSTRUMENT_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Löschen des Instrumentes ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        })
    },
    updateInstrumentEntry(state, payload) {
        return new Promise(() => {
            instrumentsService.updateInstrumentEntry(payload).then((response) => {
                state.commit('GET_INSTRUMENT_UPDATE', response);
                if (response.status === 200) {
                    state.commit('SET_INSTRUMENT_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Das Instrument wurde erfolgreich aktualisiert.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_INSTRUMENT_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Aktualisieren des Instrumentes ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        })
    }
}