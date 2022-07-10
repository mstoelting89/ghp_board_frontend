import blogService from "@/service/blogService";

export const actions = {
    getBlogFromService(state) {
        return new Promise(() => {
            blogService.getBlogPosts().then((response) => {
                state.commit('GET_BLOG', response)
            })
        })
    },
    insertNewBlogEntry(state, payload) {
        return new Promise(() => {
            blogService.insertBlogEntry(payload).then((response) => {
                state.commit('GET_BLOG_INSERT', response);
            })
        })
    },
    updateBlogEntry(state, payload) {
        return new Promise(() => {
            blogService.updateBlogEntry(payload).then((response) => {
                state.commit('GET_BLOG_UPDATE', response);
            })
        })
    },
    deleteBlogEntry(state, payload) {
        return new Promise(() => {
            blogService.deleteBlogEntry(payload).then((response) => {
                state.commit('GET_BLOG_DELETE', response);
            })
        })
    },
}