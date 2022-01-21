import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        user: {
            isLogged: false,
            isAdmin: false,
            userId: -1,
        },
    },
    mutations: {
        SAVE_USER(state, payload) {
            state.user.isAdmin = payload.user.isAdmin;
            state.user.userId = payload.user.id;
        },
        LOGOUT(state) {
            state.user.isLogged = false;
            state.user.isAdmin = false;
            state.user.userId = -1;
        },
    },
    actions: {
        getUser({ commit }) {
            axios
                .get("http://localhost:3000/api/auth/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    commit("SAVE_USER", response.data);
                });
        },
        signout({ commit }) {
            commit("LOGOUT");
        },
    },
    modules: {},
    getters: {},
});