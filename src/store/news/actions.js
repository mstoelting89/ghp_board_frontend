import newsService from "@/service/newsService";

export const actions = {
    getNewsFromService(state) {
        return new Promise(() => {
            newsService.getNews().then((response) => {
                state.commit('GET_NEWS', response);
            });
        });
    },
    getNewsDetailFromService(state, payload) {
        return new Promise(() => {
           newsService.getNewsDetail(payload).then((response) => {
               state.commit('GET_NEWS_DETAIL', response);
           })
        });
    },
    insertNewNewsEntry(state, payload) {
        return new Promise(() => {
            newsService.insertNewsEntry(payload).then((response) => {
                state.commit('GET_NEWS_INSERT', response);
                // Call Message
                if (response.status === 200) {
                    state.commit('SET_NEWS_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Der Newseintrag wurde erfolgreich gespeichert.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_NEWS_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Speichern des Newseintrages ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        })
    },
    updateNewsEntry(state, payload) {
        return new Promise(() => {
            newsService.updateNewsEntry(payload).then((response) => {
                state.commit('GET_NEWS_UPDATE', response);
                // Call Message
                if (response.status === 200) {
                    state.commit('SET_NEWS_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Der Newseintrag wurde erfolgreich aktualisiert.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_NEWS_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Aktualisieren des Newseintrages ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        })
    },
    deleteNewsEntry(state, payload) {
        return new Promise(() => {
            newsService.deleteNewsEntry(payload).then((response) => {
                state.commit('GET_NEWS_DELETE', response);
                // Call Message
                if (response.status === 200) {
                    state.commit('SET_NEWS_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Der Newseintrag wurde erfolgreich gelöscht.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_NEWS_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Löschen des Newseintrages ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        })
    },
    getAttachment(state, payload) {
        return new Promise(() => {
            newsService.getAttachment(payload).then((response) => {
                state.commit('GET_NEWS_ATTACHMENT', response);
            })
        })
    }
}