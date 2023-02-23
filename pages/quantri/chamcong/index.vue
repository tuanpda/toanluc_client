<template>
  <div class="columns is-mobile">
    <div class="column is-10 is-offset-1">
      <br />
      <div class="box">
        <div class="columns">
          <div class="column">
            <div class="control has-icons-left">
              <div class="select is-small">
                <!-- @change="showmapx($event)" -->
                <select @change="getdate($event)">
                  <option selected>-- Chọn phân xưởng --</option>
                  <option v-for="item in phanxuong" :value="item.mapx">
                    {{ item.mapx }} -- {{ item.tenpx }}
                  </option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i style="color: #48c78e" class="fas fa-kaaba"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="table_wrapper table-height">
          <table class="table is-responsive is-bordered is-narrow is-fullwidth">
            <tr>
                <td></td>
              <td v-for="(ldof, index) in listOfDayinMonth" :key="index + 'zz'">
                {{( ldof | formartDate)}}
              </td>              
            </tr>
            <tr v-for="(cn, index) in cong_nhan" :key="index + 'z'">
                <td>{{cn.tencn}}</td>
                <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  data() {
    return {
      phanxuong: [],
      cong_nhan: [],
      listOfDayinMonth: [],
      form: {
        mapx: "",
        tenpx: "",
      },
    };
  },

  mounted() {
    this.get_phanxuong();
  },

  methods: {
    // get all phân xưởng
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    getAllDaysInMonth(year, month) {
      const date = new Date(year, month, 1);
      const dates = [];

      while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }

      return dates;
    },

    async getdate(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      this.form.mapx = position[0].trim();
      this.form.tenpx = position[1].trim();
      this.cong_nhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanpx?mapx=${this.form.mapx}`
      );
      const date = new Date();
      // console.log(date.getFullYear(), date.getMonth()+1)
      // console.log(this.getAllDaysInMonth(date.getFullYear(), date.getMonth()));
      this.listOfDayinMonth = this.getAllDaysInMonth(
        date.getFullYear(),
        date.getMonth()
      );
      console.log(this.listOfDayinMonth);
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
  max-width: 200px;
  max-height: 200px;
}
#show {
  font-weight: bold;
}
#tag-fix {
  background-color: #eff5fb;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid #ffd257;
  font-weight: bold;
  font-size: 14px;
  color: #f14668;
}
</style>
