<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-atlas"></i>
              </span>
              <span style="color: #3850b7; font-size: 17px; font-weight: bold"
                >Đọc log về nhân sự</span
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-10">
            <span>Có tất cả: </span>
            <span style="font-weight: bold">{{
              lognhansu.length | formatNumber
            }}</span>
            <span>công nhân</span>
          </div>
          <div class="column" style="text-align: right">
            <nuxt-link :to="`/`">
              <button class="button is-info is-fullwidth is-small">
                <span class="icon is-small">
                  <i class="fas fa-angle-double-left"></i>
                </span>
                <span>Thoát</span>
              </button>
            </nuxt-link>
          </div>
        </div>
        <div class="table_wrapper table-height">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb">
                <th style="text-align: center; font-size: small">STT</th>
                <th style="text-align: center; font-size: small">Tên Log</th>
                <th style="text-align: center; font-size: small">Ngày tạo</th>
                <th style="text-align: center; font-size: small">Người tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, index) in lognhansu" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <td style="font-size: small">{{ log.logname }}</td>
                <td style="font-size: small; text-align: center;">{{ log.createdAt | formatDate }}</td>
                <td style="font-size: small; text-align: center;">{{ log.createdBy }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  middleware: "auth-luong",
  data() {
    return {
      lognhansu: [],
    };
  },

  mounted() {
    this.getLog();
  },

  methods: {
    async getLog() {
      this.lognhansu = await this.$axios.$get(`/api/congnhan/getalllognhansu`);
      if (this.lognhansu.length <= 0) {
        this.$toasted.show("Không có Log nào", {
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
  height: 550px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

.modal-content,
.modal-card {
  width: 620px;
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
