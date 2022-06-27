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
    insertNewNewsEntry({ commit }, payload) {
        commit("NEWS");

        return new Promise((resolve) => {
            newsService.insertNewsEntry(payload).then((response) => {
                resolve(response);
            });
        })
    },
    updateNewsEntry({ commit }, payload) {
        commit("NEWS");

        return new Promise((resolve) => {
            newsService.updateNewsEntry(payload).then((response) => {
                resolve(response);
            })
        })
    },
    deleteNewsEntry({ commit }, payload) {
        commit("NEWS");

        return new Promise((resolve) => {
            newsService.deleteNewsEntry(payload).then((response) => {
                resolve(response);
            })
        })
    },
    getAttachment({ commit }, payload) {
        commit("NEWS");

        return new Promise((resolve) => {
            newsService.getAttachment(payload).then((response) => {
                resolve(response);
            })
        })
    }
}