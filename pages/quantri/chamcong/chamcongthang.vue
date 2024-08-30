<template>
  <div
    class="box"
    style="margin-left: 10px; margin-right: 10px; margin-top: 10px"
  >
    <div class="columns">
      <div class="column is-11">
        <div class="control">
          <span class="icon is-small is-left">
            <i style="color: #f14668" class="fa fa-calendar"></i>
          </span>
          Bảng chấm công
        </div>
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
      <table class="table is-responsive is-bordered is-narrow is-fullwidth">
        <tr>
          <td
            colspan="6"
            style="
              text-align: center;
              font-weight: bold;
              text-transform: uppercase;
            "
          >
            Bảng chấm công
            <template v-if="phanxuongcc != ''">{{ phanxuongcc }}</template>
            <template v-if="tocc != ''">{{ tocc }}</template>
          </td>
        </tr>
        <tr>
          <td style="width: 45%; font-size: small">
            <input type="checkbox" v-model="checkKhoivp" /> Khối văn phòng
          </td>
          <td>
            <input
              v-model="startDate"
              type="date"
              class="input is-success is-small"
            />
          </td>
          <td>
            <input
              v-model="endDate"
              type="date"
              class="input is-success is-small"
            />
          </td>
          <template v-if="checkKhoivp == false">
            <td>
              <div class="select is-small">
                <select @change="getTo($event)">
                  <option selected>-- Chọn phân xưởng --</option>
                  <option v-for="item in phanxuong" :value="item.mapx">
                    {{ item.mapx }} -- {{ item.tenpx }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div class="select is-small">
                <select @change="loadBc($event)">
                  <option selected>-- Chọn tổ --</option>
                  <option v-for="item in tonhomid" :value="item.mapx">
                    {{ item.mato }} -- {{ item.tento }}
                  </option>
                </select>
              </div>
            </td>
          </template>
          <template v-else>
            <td>
              <div class="select is-small">
                <select @change="getBCVP($event)">
                  <option selected>-- Chọn bộ phận Văn phòng --</option>
                  <option>VPBP</option>
                  <option>VPGT1</option>
                  <option>VPGT2</option>
                </select>
              </div>
            </td>
          </template>

          <td style="width: 45%; text-align: right">
            <vue-excel-xlsx
              :data="dataChamcong"
              :columns="columns"
              :file-name="'chamcong'"
              :file-type="'xlsx'"
              :sheet-name="'Dữ liệu chấm công'"
            >
              Download Execl
            </vue-excel-xlsx>
          </td>
        </tr>
      </table>
      <table
        v-if="dataChamcong.length > 0"
        class="table is-responsive is-bordered is-narrow is-fullwidth"
      >
        <tr style="background-color: honeydew">
          <th
            style="
              text-align: center;
              font-size: small;
              font-weight: bold;
              width: 3%;
            "
          >
            STT
          </th>
          <th
            style="
              text-align: center;
              font-size: small;
              font-weight: bold;
              width: 7%;
            "
          >
            Mã công nhân
          </th>
          <th
            style="
              text-align: center;
              font-size: small;
              font-weight: bold;
              width: 10%;
            "
          >
            Tên công nhân
          </th>
          <th
            style="
              text-align: center;
              font-size: small;
              font-weight: bold;
              width: 5%;
            "
            v-for="date in dates"
          >
            {{ date }}
          </th>
          <th></th>
        </tr>
        <tr v-for="(cc, index) in dataChamcong" :key="index">
          <td style="text-align: center; font-size: small">{{ index + 1 }}</td>
          <td style="font-size: small; text-align: center">{{ cc.macn }}</td>
          <td style="font-size: small">{{ cc.tencn }}</td>
          <td
            style="font-size: small; text-align: center"
            v-for="(date, index) in dates"
            :key="index"
          >
            {{ cc[date] }}
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phanxuong: [],
      tonhomid: [],
      dataChamcong: [],
      khoangtime: "",
      startDate: "",
      endDate: "",
      mapx: "",
      thangcc: "",
      namcc: "",
      phanxuongcc: "",
      tocc: "",
      checkKhoivp: false,
      columns: [
        {
          label: "Mã công nhân",
          field: "macn",
        },
        {
          label: "Tên công nhân",
          field: "tencn",
        },
      ],
    };
  },

  mounted() {
    this.get_phanxuong();
  },

  computed: {
    dates() {
      return Object.keys(this.dataChamcong[0])
        .filter((key) => key !== "macn" && key !== "tencn")
        .sort();
    },
  },

  methods: {
    // format date
    prefixformatDate(value) {
      if (!value) {
        return "";
      }
      value = new Date(value);
      return (
        value.getFullYear() +
        "-" +
        ("0" + (value.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + value.getDate()).slice(-2)
      );
    },
    async get_phanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },
    async getChamcong() {
      //   console.log(this.startDate, this.endDate);
      const response = await this.$axios.get(
        `/api/congnhan/baocaothangtheopx?mapx=${this.mapx}&startDate=${this.startDate}&endDate=${this.endDate}`
      );
      //   this.dataChamcong.
      // console.log(response);
      this.dataChamcong = response.data;
    },
    createDays() {
      const startDate = new Date(this.startDate); // Chuyển đổi chuỗi thành đối tượng Date
      const endDate = new Date(this.endDate); // Chuyển đổi chuỗi thành đối tượng Date
      const dates = [];
      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        dates.push(new Date(date)); // Tạo danh sách các ngày trong tháng
      }
      this.dates = dates;
    },
    formatDate(date) {
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      return date.toLocaleDateString("vi-VN", options);
    },
    getThongtinCC(cc, date) {
      //   console.log(employee, date);
      if (cc && cc.ngaychamcong) {
        const markchamcong =
          cc.ngaychamcong.slice(0, 10) === date.toISOString().slice(0, 10)
            ? cc.machamcong
            : "-";
        return markchamcong;
      } else {
        return "-";
      }
    },
    async getTo(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const mapx = position[0];
      const tenpx = position[1];
      this.cong_nhan = await this.$axios.$get(
        `/api/congnhan/allcongnhanpx?mapx=${mapx}`
      );
      this.tonhomid = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${mapx}`
      );

      if (this.tonhomid.length <= 0) {
        this.tocc = "";
        const date = new Date(this.khoangtime);
        this.namcc = date.getFullYear(); // Lấy năm
        this.thangcc = date.getMonth() + 1;
        this.phanxuongcc = tenpx;

        const response = await this.$axios.get(
          `/api/congnhan/baocaochamcongthangphanxuong?mapx=${mapx}&startDate=${this.startDate}&endDate=${this.endDate}`
        );
        // console.log(response.data);
        this.dataChamcong = response.data;

        // const firstDayOfMonth = new Date(
        //   date.getFullYear(),
        //   date.getMonth(),
        //   1
        // );
        // const lastDayOfMonth = new Date(
        //   date.getFullYear(),
        //   date.getMonth() + 1,
        //   0
        // );

        // // ngày đầu trong tháng
        // const yearFd = firstDayOfMonth.getFullYear();
        // const monthFd = (firstDayOfMonth.getMonth() + 1)
        //   .toString()
        //   .padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần phải cộng thêm 1
        // const dayFd = firstDayOfMonth.getDate().toString().padStart(2, "0");

        // // ngày cuối trong tháng
        // const yearLd = lastDayOfMonth.getFullYear();
        // const monthLd = (lastDayOfMonth.getMonth() + 1)
        //   .toString()
        //   .padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần phải cộng thêm 1
        // const dayLd = lastDayOfMonth.getDate().toString().padStart(2, "0");

        // const ngaybdtt = yearFd + "-" + monthFd + "-" + dayFd;
        // const ngaykttt = yearLd + "-" + monthLd + "-" + dayLd;

        // //   console.log(ngaybdtt);
        // //   console.log(ngaykttt);

        // this.startDate = ngaybdtt;
        // this.endDate = ngaykttt;
        // this.createDays();
        // const response = await this.$axios.get(
        //   `/api/congnhan/baocaothangtheopx?mapx=${mapx}&startDate=${this.startDate}&endDate=${this.endDate}`
        // );
        // //   this.dataChamcong.
        // //   console.log(response);
        // this.dataChamcong = response.data;
      }
      // else {
      //   const date = new Date(this.khoangtime);
      //   this.namcc = date.getFullYear(); // Lấy năm
      //   this.thangcc = date.getMonth() + 1;
      // }
    },
    async loadBc(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const mato = position[0];
      const tento = position[1];
      this.phanxuongcc = "";
      this.tocc = tento;

      const response = await this.$axios.get(
        `/api/congnhan/baocaochamcongthangto?mato=${mato}&startDate=${this.startDate}&endDate=${this.endDate}`
      );
      // console.log(response.data);
      this.dataChamcong = response.data;

      // //   console.log(this.khoangtime);
      // const date = new Date(this.khoangtime);
      // //   console.log(date);
      // const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      // const lastDayOfMonth = new Date(
      //   date.getFullYear(),
      //   date.getMonth() + 1,
      //   0
      // );

      // // ngày đầu trong tháng
      // const yearFd = firstDayOfMonth.getFullYear();
      // const monthFd = (firstDayOfMonth.getMonth() + 1)
      //   .toString()
      //   .padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần phải cộng thêm 1
      // const dayFd = firstDayOfMonth.getDate().toString().padStart(2, "0");

      // // ngày cuối trong tháng
      // const yearLd = lastDayOfMonth.getFullYear();
      // const monthLd = (lastDayOfMonth.getMonth() + 1)
      //   .toString()
      //   .padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần phải cộng thêm 1
      // const dayLd = lastDayOfMonth.getDate().toString().padStart(2, "0");

      // const ngaybdtt = yearFd + "-" + monthFd + "-" + dayFd;
      // const ngaykttt = yearLd + "-" + monthLd + "-" + dayLd;

      // //   console.log(ngaybdtt);
      // //   console.log(ngaykttt);

      // this.startDate = ngaybdtt;
      // this.endDate = ngaykttt;
      // this.createDays();
      // const response = await this.$axios.get(
      //   `/api/congnhan/baocaothangtheoto?mato=${mato}&startDate=${this.startDate}&endDate=${this.endDate}`
      // );
      // //   this.dataChamcong.
      // //   console.log(response);
      // this.dataChamcong = response.data;
    },

    async getBCVP(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name);
      const response = await this.$axios.get(
        `/api/congnhan/baocaochamcongthangphanxuong?mapx=${name}&startDate=${this.startDate}&endDate=${this.endDate}`
      );
      this.dataChamcong = response.data;
      // console.log(this.dataChamcong);
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
</style>
