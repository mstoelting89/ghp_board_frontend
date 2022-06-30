export const mutations = {
    GET_NEWS(state, payload) {
        state.newsArray = payload;
    },
    GET_NEWS_DETAIL(state, payload) {
        state.newsDetailArray = payload;
    },
    GET_NEWS_UPDATE(state, payload) {
        state.newsUpdateArray = payload;
    },
    GET_NEWS_DELETE(state, payload) {
        state.newsDelete = payload;
    }
}