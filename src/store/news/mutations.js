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
        state.newsDeleteArray = payload;
    },
    GET_NEWS_INSERT(state, payload) {
        state.newsInsertArray = payload
    },
    GET_NEWS_ATTACHMENT(state, payload) {
        state.newsAttachmentArray = payload;
    }
}