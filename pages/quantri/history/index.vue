<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i class="fas fa-code"></i>
              </span>
              Ghi log sử dụng phần mềm
            </div>
          </div>
        </div>

        <div class="table_wrapper table-height">
          <table class="
              table
              is-bordered is-striped is-narrow is-hoverable is-fullwidth
            ">
            <thead>
              <tr>
                <th style="text-align: center">STT</th>
                <th style="text-align: center">Tên log</th>
                <th style="text-align: center">Người tạo log</th>
                <th style="text-align: center">Ngày tạo log</th>
                <th style="text-align: center">Diễn giải log</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tt, index) in hisData" :key="index">
                <td style="text-align: center">{{ index + 1 }}</td>
                <td>{{ tt.tenthaotac }}</td>
                <td style="text-align: center">{{ tt.createdBy }}</td>
                <td>{{ tt.createdAt }}</td>
                <td>{{ tt.ghichu }}</td>
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
  middleware: "auth-admin",
  data() {
    return {
      hisData: [],
    };
  },

  mounted() {
    this.getHistory();
  },

  methods: {
    // get all data
    async getHistory() {
      this.hisData = await this.$axios.$get(`/api/ketoan/allhis`);
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

th {
  text-align: left;
  background: #feecf0;
  position: sticky;
  top: 0px;
}

.modal-content,
.modal-card {
  width: 820px;
  height: 560px;
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
