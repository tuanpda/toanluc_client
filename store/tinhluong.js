import Vue from "vue";

export const state = () => ({
  items: [],
  item: {},

});

export const actions = {
  // Tìm theo mã Id
  fetchnhanvienById({ commit, state }, nhanvienId) {
    return this.$axios.$get(`/api/nhanvien/${nhanvienId}`).then((nhanvien) => {
      commit("setnhanvien", nhanvien);
      return state.item;
    });
  },
};

export const mutations = {
  setnhanviens(state, nhanviens) {
    state.items = nhanviens;
  },
  setnhanvien(state, nhanvien) {
    state.item = nhanvien;
  },
};
