export const state = () => ({
  luongcongdoans: null,
  luongcongnhats: null,
});

export const actions = {
  // lấy danh sách lương công đoạn bằng id lô sx
  async fetchLuongcd({ commit }, idlosx) {
    // console.log(idlosx);
    const data = await this.$axios.$get(
      `/api/ketoan/getallluongcongdoaninlsx?_id_losx=${idlosx}`
    );
    commit("setLuongcd", data);
  },
  // lấy danh sách lương công nhật bằng id lô sx
  async fetchLuongcn({ commit }, idlosx) {
    const data = await this.$axios.$get(
      `/api/ketoan/getallluongcongnhatinlsx?_id_losx=${idlosx}`
    );
    commit("setLuongcn", data);
  },
  // cập nhật số đạt / số hỏng trong từng công đoạn
  async updateSohongLcd({ commit }, payload) {
    try {
      // console.log(payload.soluonglsx);
      // console.log(payload.sohong);
      const dtupdate = { sohong: payload.sohong };
      const response = await this.$axios.$patch(
        `/api/ketoan/updateluongcongdoansohong/${payload.data._id}`,
        dtupdate
      );
      // const data = await this.$axios.$get("/api/ketoan/getallphieulocht");
      // commit("setLosanxuats", data);
    } catch (error) {
      console.error(error);
    }
  },
  async updateSodatLcd({ commit }, payload) {
    try {
      // console.log(payload.sodat);
      const dtupdate = { sodat: payload.sodat };
      const response = await this.$axios.$patch(
        `/api/ketoan/updateluongcongdoansodat/${payload.data._id}`,
        dtupdate
      );
      // const data = await this.$axios.$get("/api/ketoan/getallphieulocht");
      // commit("setLosanxuats", data);
    } catch (error) {
      console.error(error);
    }
  },
};

export const mutations = {
  setLuongcd(state, luongcongdoans) {
    state.luongcongdoans = luongcongdoans;
  },
  setLuongcn(state, luongcongnhats) {
    state.luongcongnhats = luongcongnhats;
  },
};
