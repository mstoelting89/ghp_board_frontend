export const mutations = {
    GET_BLOG(state, payload) {
        state.blogArray = payload;
    },
    GET_BLOG_INSERT(state, payload) {
        state.blogInsert = payload;
    },
    GET_BLOG_UPDATE(state, payload) {
        state.blogUpdate = payload;
    }
}