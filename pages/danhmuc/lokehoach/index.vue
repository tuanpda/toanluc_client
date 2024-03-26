<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i class="far fa-check-square"></i>
              </span>
              Danh mục Mã kế hoạch trong năm
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-8">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              kehoach.length | formatNumber
            }}</span>
            <span>danh mục mã kế hoạch</span>
          </div>
          <div class="column" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-fullwidth is-small">
                Thoát
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="table_wrapper table-height">
          <table
            class="
                table
                is-bordered is-striped is-narrow is-hoverable is-fullwidth
              "
          >
            <thead>
              <tr>
                <th style="text-align: center">STT</th>
                <th style="text-align: center">Năm</th>
                <th style="text-align: center">Mã kế hoạch</th>
                <th style="text-align: center">Tên kế hoạch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(kh, index) in kehoach" :key="index">
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="text-align: center">{{ kh.nam }}</td>
                <td style="text-align: center">{{ kh.makh }}</td>
                <td style="text-align: center">{{ kh.tenkehoach }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  middleware: "auth-luong",
  data() {
    return {
      kehoach: [],
      form: {
        nam: null,
        makh: null,
        tenkehoach: null,
        ghichu: "",
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        status: 0,
        // updatedAt: new Date().toISOString().substr(0, 10),
      },
    };
  },



  mounted() {
    this.getlokh();
  },


  methods: {
    async getlokh() {
      this.kehoach = await this.$axios.$get(`/api/lokehoach/alllokehoach`);
      if (this.kehoach.length <= 0) {
        this.$toasted.show("Danh mục kế hoạch rỗng", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

.table_wrapper {
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height {
  height: 350px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

th {
  text-align: left;
  background: #feecf0;
  position: sticky;
  top: 0px;
}

.modal-content,
.modal-card {
  width: 720px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
#preview img {
  max-width: 90px;
  max-height: 90px;
}
</style>
