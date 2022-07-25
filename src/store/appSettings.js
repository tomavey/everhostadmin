


export default {
    state: {
        appSettings: {},
    },
    getters: {
        appSettings: state => state.appSettings,
    },
    mutations: {
        setAppSettings(state, payload) {
            state.appSettings = payload
        }
    }
}