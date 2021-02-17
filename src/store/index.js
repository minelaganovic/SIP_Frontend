import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import costs from "./costs";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        refreshInMinutes: process.env.VUE_APP_TOKEN_REFRESH_IN_MINUTES,
        apiBase: process.env.VUE_APP_API_ROOT,
        apiIdentityBase: process.env.VUE_APP_IDENTITY_ROOT,
        status: "",
        token: localStorage.getItem("token") || "",
        refreshToken: "",
        admin: false,
        user: [],
        firstname: "",
        lastname: "",
        note: ""
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, payload) {
            state.status = "success";
            state.token = payload.token;
            state.refreshToken = payload.refreshToken;
            state.admin = payload.admin;
            state.firstname = payload.firstname;
            state.lastname = payload.lastname;
            state.note = payload.note;
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.token = "";
        },
    },
    actions: {
        setToken({ state }) {
            return new Promise((resolve) => {
                let token;
                if (state.token == "") {
                    //console.log("ovde logout?");
                } else {
                    // Ovde da ga odvede na login?
                    //console.log("Postavi token!");
                    token = localStorage.getItem("token");
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                }
                resolve(token);
            });
        },
        login({ commit, dispatch, state }, { email, password }) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                        url: state.apiBase + state.apiIdentityBase + "login",
                        data: {
                            email: email,
                            password: password,
                        },
                        method: "POST",
                    })
                    .then((resp) => {
                        console.log("Prosao logovanje:");
                        console.log(resp.data);
                        const token = resp.data.token;
                        const refreshToken = resp.data.refreshToken;
                        const admin = resp.data.admin;
                        const firstname = resp.data.firstName;
                        const lastname = resp.data.lastName;
                        const note = resp.data.note;

                        localStorage.setItem("token", token);
                        axios.defaults.headers.common["Authorization"] = "Bearer  " + token;
                        commit("auth_success", {
                            token: token,
                            refreshToken: refreshToken,
                            admin: admin,
                            firstname: firstname,
                            lastname: lastname,
                            note: note,
                        });

                        dispatch("startRefreshInXMinutesAsync");
                        resolve(resp);
                    })
                    .catch((err) => {
                        console.log(err);
                        commit("auth_error");
                        alert("Wrong username or password");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        refresh({ commit, dispatch, state }) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                        url: state.apiBase + state.apiIdentityBase + "refresh",
                        data: {
                            token: state.token,
                            refreshToken: state.refreshToken,
                        },
                        method: "POST",
                    })
                    .then((resp) => {
                        const token = resp.data.token;
                        const refreshToken = resp.data.refreshToken;
                        const admin = resp.data.admin;
                        const firstname = resp.data.firstName;
                        const lastname = resp.data.lastName;
                        const note = resp.data.note;

                        localStorage.setItem("token", token);
                        axios.defaults.headers.common["Authorization"] = "Bearer  " + token;
                        commit("auth_success", {
                            token: token,
                            refreshToken: refreshToken,
                            admin: admin,
                            firstname: firstname,
                            lastname: lastname,
                            note: note,
                        });

                        dispatch("startRefreshInXMinutesAsync");
                        resolve(resp);
                    })
                    .catch((err) => {
                        commit("auth_error");
                        localStorage.removeItem("token");
                        router.push("/signin");
                        reject(err);
                    });
            });
        },
        startRefreshInXMinutesAsync({ dispatch, state }) {
            let secoundsDelay = state.refreshInMinutes * 60000;
            setTimeout(() => {
                dispatch("refresh");
            }, secoundsDelay);
        },
        logout({ commit }) {
            return new Promise((resolve /*, reject*/ ) => {
                commit("logout");
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
                //console.log(reject);
            });
        },
        register({ commit, dispatch, state }, { first_name, last_name, email, password }) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                        url: state.apiBase + state.apiIdentityBase + "register",
                        data: {
                            email: email,
                            password: password,
                            firstname: first_name,
                            lastname: last_name,
                        },
                        method: "POST",
                    })
                    .then((resp) => {
                        // console.log(resp.data);

                        resolve(resp);
                    })
                    .catch((err) => {
                        console.log(err);
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        update({ commit, dispatch, state }, { firstname, lastname, note }) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                        url: state.apiBase + state.apiIdentityBase + "update",
                        data: {
                            firstname: firstname,
                            lastname: lastname,
                            note: note,
                        },
                        method: "PUT",
                    })
                    .then((resp) => {
                        state.firstname = firstname;
                        state.lastname = lastname;
                        state.note = note;
                        resolve(resp);
                    })
                    .catch((err) => {
                        console.log(err);
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        }
    },

    modules: {
        costs
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
        authStatus: (state) => state.status,
        token: (state) => state.token,
        isAdmin: (state) => state.admin,
        firstname: (state) => state.firstname,
        lastname: (state) => state.lastname,
        note: (state) => state.note,
    }

});