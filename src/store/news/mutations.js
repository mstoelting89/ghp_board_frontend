export const mutations = {
    GET_NEWS(state, payload) {
        state.newsArray = payload;
    },
    GET_NEWS_DETAIL(state, payload) {
        state.newsDetailArray = payload;
    }
}