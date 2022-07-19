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
                if (response.status === 200) {
                    state.commit('SET_BLOG_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Der Blogeintrag wurde erfolgreich gespeichert.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_BLOG_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Speichern des Blogeintrages ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        });
    },
    updateBlogEntry(state, payload) {
        return new Promise(() => {
            blogService.updateBlogEntry(payload).then((response) => {
                state.commit('GET_BLOG_UPDATE', response);
                if (response.status === 200) {
                    state.commit('SET_BLOG_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Der Blogeintrag wurde erfolgreich aktualisiert.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_BLOG_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Aktualisieren des Blogeintrages ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        });
    },
    deleteBlogEntry(state, payload) {
        return new Promise(() => {
            blogService.deleteBlogEntry(payload).then((response) => {
                state.commit('GET_BLOG_DELETE', response);
                if (response.status === 200) {
                    state.commit('SET_BLOG_MESSAGE_ARRAY', {
                        error: false,
                        success: true,
                        message: 'Der Blogeintrag wurde erfolgreich gelöscht.',
                        redirect: ''
                    });
                }
            }).catch(() => {
                state.commit('SET_BLOG_MESSAGE_ARRAY', {
                    error: false,
                    success: true,
                    message: 'Beim Löschen des Blogeintrages ist ein Fehler aufgetreten',
                    redirect: ''
                });
            });
        });
    },
}