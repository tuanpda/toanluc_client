import Vue from "vue";

export const state = () => ({
  items: [],
  item: {},
  // pagination: {
  //   count: 0, // Danh sách tất cả đơn vị
  //   pageCount: 0, // Số trang muốn hiển thị
  //   pageSize: 10, // Số đơn vị hiển thị trên 1 trang
  //   pageNum: 1, // Trang hiện tại
  // },
});

export const actions = {
  // Fetch List ds đơn vị
  fetchDocthus({ commit, state }, filter) {
    const url = this.$applyParamsToUrl("/api/v1/docthus", filter);
    return this.$axios
      .$get(url)
      .then((data) => {
        const { docthus, count, pageCount } = data;
        commit("setDocthus", docthus);
        // commit("setPagination", { count, pageCount });
        return state.items;
      })
      .catch((error) => Promise.reject(error));
  },
  // Fecth theo mã đơn vị
  fetchByMadonvi({ commit, state }, madonvi) {
    return this.$axios
      .$get(`/api/v1/donvis/mdv/${madonvi}`)
      .then((donvi) => {
        // commit
        commit("setDonvi", donvi);
        return state.item;
      })
      .catch((error) => Promise.reject(error));
  },
  // Tìm theo mã Id
  fetchDocthuById({ commit, state }, docthuId) {
    return this.$axios.$get(`/api/docthu/${docthuId}`).then((docthu) => {
      commit("setDocthu", docthu);
      return state.item;
    });
  },
  // Fecth theo mã đơn vị
  fetchByMadonvi({ commit, state }, madonvi) {
    return this.$axios
      .$get(`/api/v1/docthus/mdv/${madonvi}`)
      .then((docthu) => {
        // commit
        commit("setDocthu", docthu);
        return state.item;
      })
      .catch((error) => Promise.reject(error));
  },
  // Create
  createDocthu(_, docthuData) {
    return this.$axios.$post("/api/v1/docthus", docthuData);
  },
  // Update
  updateDocthu({ state, commit }) {
    const docthu = state.item;
    return this.$axios
      .$patch(`/api/v1/docthus/${docthu._id}`, docthu)
      .then((docthu) => {
        commit("setDocthu", docthu);
        return state.item;
      })
      .catch((error) => Promise.reject(error));
  },
  // Remove
  deleteDocthu({ commit }, docthuId) {
    return this.$axios
      .$delete(`/api/v1/docthus/${docthuId}`)
      .then((_) => {
        return true;
      })
      .catch((error) => Promise.reject(error));
  },
  // updateDocthuValue({ commit }, { value, field }) {
  //   commit("setDocthuValue", { value, field });
  // },
};

export const mutations = {
  setDocthus(state, docthus) {
    state.items = docthus;
  },
  setDocthu(state, docthu) {
    state.item = docthu;
  },
  // setDocthuValue(state, { value, field }) {
  //   state.item[field] = value;
  // },
  // setPage(state, currentPage) {
  //   Vue.set(state.pagination, "pageNum", currentPage);
  // },
  // setPagination(state, { count, pageCount }) {
  //   Vue.set(state.pagination, "count", count);
  //   Vue.set(state.pagination, "pageCount", pageCount);
  // },
};
