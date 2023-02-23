import Vue from "vue";

export const state = () => ({
  items: [],
  item: {},
});

export const actions = {
  /* Get by _id */
  fetchUserById({ commit, state }, userId) {
    return this.$axios.$get(`/api/users/${userId}`).then((user) => {
      commit("setUser", user);
      return state.item;
    });
  },

  /* Update */
  updateUser({ state, commit }) {
    const user = state.item;
    return this.$axios
      .$patch(`/api/users/auth/user`, user)
      .then((user) => {
        commit("setUser", user);
        return state.item;
      })
      .catch((error) => Promise.reject(error));
  },
};

export const mutations = {
  setUsers(state, users) {
    state.items = users;
  },
  setUser(state, user) {
    state.item = user;
  },
};
