import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types = {
    SET_IS_AUTHORIZATION: 'SET_IS_AUTHORIZATION',   // 是否认证通过
    SET_USER: 'SET_USER'  // 用户信息
}
const state = {  // 需要维护的状态
    isAuthorization: false,   // 是否认证
    user: {}    // 存储用户信息
}
const getters = {
    isAuthorization: state => state.isAuthorization,
    user: state => state.user
}
const mutations = {
    [types.SET_IS_AUTHORIZATION](state, isAuthorization) {
        if (isAuthorization)
            state.isAuthorization = isAuthorization
        else
            state.isAuthorization = false
    },
    [types.SET_USER](state, user) {
        if (user)
            state.user = user
        else
            state.user = {}
    }
}
const actions = {
    setIsAuthorization: ({ commit }, isAuthorization) => {
        commit(types.SET_IS_AUTHORIZATION, isAuthorization)
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    clearCurrentState: ({ commit }) => {
        commit(types.SET_IS_AUTHORIZATION, false)
        commit(types.SET_USER, null)
    }
}
export default new Vuex.Store({
    types,
    state,
    getters,
    mutations,
    actions
})
