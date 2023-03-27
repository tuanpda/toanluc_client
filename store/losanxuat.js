export const state = () => {
  return {
    items: [],
    item: {},
  };
};

// getters như thuộc tính computed trong vue component nhưng nó dành cho Vuex
export const getters = {
  hasEmptyItems(state) {
    return state.items.length === 0;
  },
};

// Very good spot to send a request to a server. Usualy Actions resolve into some data
export const actions = {
  async fetchLosanxuat({ commit }) {
    const data = await this.$axios.$get("/api/ketoan/getallphieulocht");
    commit("setLosanxuats", data);
  },

  async updateLosanxuat({ commit }, payload) {
    try {
      // console.log(payload.soluonglsx);
      // console.log(payload.data);
      const dtupdate = { soluonglsx: payload.soluonglsx };
      const response = await this.$axios.$patch(
        `/api/ketoan/updatesoluonglsx/${payload.data._id}`,
        dtupdate
      );
      const data = await this.$axios.$get("/api/ketoan/getallphieulocht");
      commit("setLosanxuats", data);
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  },

  createLosanxuat({ commit }, dataLosx) {
    commit("addLosanxuat", dataLosx);
  },
};

// Mutations are simple functions that have access to a state.
// Mutations are used to assign values to a state
export const mutations = {
  setLosanxuats(state, losanxuats) {
    state.items = losanxuats;
  },
  addLosanxuat(state, losanxuat) {
    state.items.push(losanxuat);
  },
};
