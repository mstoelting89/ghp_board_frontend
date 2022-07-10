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
            blogService.insertDemandEntry(payload).then((response) => {
                state.commit('GET_BLOG_INSERT', response);
            })
        })
    }
}