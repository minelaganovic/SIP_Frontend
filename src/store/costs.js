import axios from "axios";

const costs = {
    namespaced: true,
    state: {
        apiBase: process.env.VUE_APP_API_ROOT,
        apiCostBase: process.env.VUE_APP_COSTS,
        costs: [],
        lastCost: "",
    },
    mutations: {
        add_costs_to_state(state, costs) {
            state.costs = costs;
        },
        add_cost_to_state(state, cost) {
            state.lastCost = cost;
        },
    },
    actions: {
        getCosts({ commit, state }, { categoryId, dateFrom, dateTo }) {
            return new Promise((resolve, reject) => {
                axios({
                        url: state.apiBase + state.apiCostBase,
                        method: "GET",
                        params: {
                            categoryId,
                            dateFrom,
                            dateTo,
                        },
                    })
                    .then((resp) => {
                        commit("add_costs_to_state", resp.data);
                        resolve(resp);
                    })
                    .catch((err) => {
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        postCost({ commit, state }, { products }) {
            return new Promise((resolve, reject) => {
                axios({
                        url: state.apiBase + state.apiCostBase,
                        data: products,
                        method: "POST",
                    })
                    .then((resp) => {
                        resolve(resp);
                    })
                    .catch((err) => {
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
                resolve;
            });
        },
    },
    getters: {
        getCosts: (state) => {
            return state.costs;
        },
    },
};

export default costs;