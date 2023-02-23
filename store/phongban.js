import Vue from "vue";

export const state = () => ({
  items: [],
  item: {},
});

export const actions = {
  // lấy danh sách phòng ban
  fetchPhongbans({ state, commit }) {
    return this.$axios.$get(`/api/phongban/allphongban`).then((phongbans) => {
      commit("setPhongbans", phongbans);
      return state.items;
    });
  },
  // tạo phòngs
  createPhongban(_, RoomData){
    return this.$axios.$post("/api/phongban/addphongban", RoomData);
  }
};

export const mutations = {
  setPhongbans(state, phongbans) {
    state.items = phongbans;
  },
};
