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
            });
        })
    },
    updateNewsEntry(state, payload) {
        return new Promise(() => {
            newsService.updateNewsEntry(payload).then((response) => {
                state.commit('GET_NEWS_UPDATE', response);
            })
        })
    },
    deleteNewsEntry(state, payload) {
        return new Promise(() => {
            newsService.deleteNewsEntry(payload).then((response) => {
                state.commit('GET_NEWS_DELETE', response);
            })
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