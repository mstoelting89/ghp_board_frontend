export const getters = {
    loggedIn: state => state.loggedIn,
    loginErrorMessage: state => state.errorMsg,
    userEmail: state => state.userEmail,
    getUserLevel: state => state.userLevel
}