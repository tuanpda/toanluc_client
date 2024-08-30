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
              width: 6%;
            "
          >
            Tổng ngày làm
          </th>
          <th
            style="
              text-align: center;
              font-size: small;
              font-weight: bold;
              width: 6%;
            "
          >
            Tổng nghỉ phép
          </th>
          <th
            style="
              text-align: center;
              font-size: small;
              font-weight: bold;
              width: 6%;
            "
          >
            Tổng nghỉ ốm
          </th>
          <th
            style="
              text-align: center;
              font-size: small;
              font-weight: bold;
              width: 6%;
            "
          >
            Tổng Không phép
          </th>
          <th
            style="
              text-align: center;
              font-size: small;
              font-weight: bold;
              width: 8%;
            "
          >
            Tổng nghỉ lễ, KH, cuối tuần
          </th>
          <th
            style="
              text-align: center;
              font-size: small;
              font-weight: bold;
              width: 8%;
            "
          >
            Tổng số ngày nghỉ
          </th>
          <th></th>
        </tr>
        <tr v-for="(cc, index) in dataChamcong" :key="index">
          <td style="text-align: center; font-size: small">{{ index + 1 }}</td>
          <td style="font-size: small; text-align: center">{{ cc.macn }}</td>
          <td style="font-size: small">{{ cc.tencn }}</td>
          <td style="font-size: small; text-align: center">{{ cc.tonglam }}</td>
          <td style="font-size: small; text-align: center">
            {{ cc.tongphep }}
          </td>
          <td style="font-size: small; text-align: center">{{ cc.tongom }}</td>
          <td style="font-size: small; text-align: center">
            {{ cc.tongkhongphep }}
          </td>
          <td style="font-size: small; text-align: center">
            {{ cc.tongkehoachlecuoituan }}
          </td>
          <td style="font-size: small; text-align: center">
            {{ cc.tongnghi }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td
            colspan="3"
            style="font-size: small; text-align: left; font-weight: bold"
          >
            Tổng cộng
          </td>
          <td style="font-size: small; text-align: center; font-weight: bold">
            {{ sumTonglam }}
          </td>
          <td style="font-size: small; text-align: center; font-weight: bold">
            {{ sumTongphep }}
          </td>
          <td style="font-size: small; text-align: center; font-weight: bold">
            {{ sumTongom }}
          </td>
          <td style="font-size: small; text-align: center; font-weight: bold">
            {{ sumTongkhongphep }}
          </td>
          <td style="font-size: small; text-align: center; font-weight: bold">
            {{ sumTongkehoachlecuoituan }}
          </td>
          <td style="font-size: small; text-align: center; font-weight: bold">
            {{ sumTongdanghi }}
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
        {
          label: "Tổng ngày làm",
          field: "tonglam",
        },
        {
          label: "Tổng nghỉ phép",
          field: "tongphep",
        },

        {
          label: "Tổng nghỉ ốm",
          field: "tongom",
        },
        {
          label: "Tổng không phép",
          field: "tongkhongphep",
        },
        {
          label: "Tổng nghỉ lễ, cuối tuần, kế hoạch",
          field: "tongkehoachlecuoituan",
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
    sumTonglam() {
      return this.dataChamcong.reduce((total, cc) => total + cc.tonglam, 0);
    },
    sumTongphep() {
      return this.dataChamcong.reduce((total, cc) => total + cc.tongphep, 0);
    },
    sumTongom() {
      return this.dataChamcong.reduce((total, cc) => total + cc.tongom, 0);
    },
    sumTongkhongphep() {
      return this.dataChamcong.reduce(
        (total, cc) => total + cc.tongkhongphep,
        0
      );
    },
    sumTongkehoachlecuoituan() {
      return this.dataChamcong.reduce(
        (total, cc) => total + cc.tongkehoachlecuoituan,
        0
      );
    },
    sumTongdanghi() {
      return this.dataChamcong.reduce((total, cc) => total + cc.tongnghi, 0);
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
      //   console.log(response);
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
        //   this.tocc = "";
        //   const date = new Date(this.khoangtime);
        //   this.namcc = date.getFullYear(); // Lấy năm
        //   this.thangcc = date.getMonth() + 1;
        //   this.phanxuongcc = tenpx;

        const response = await this.$axios.get(
          `/api/congnhan/baocaotonghoptheophanxuong?mapx=${mapx}&tungay=${this.startDate}&denngay=${this.endDate}`
        );
        this.dataChamcong = response.data;
        //   console.log(this.dataChamcong);
      }
    },

    async loadBc(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      let position = name.split("--");
      const mato = position[0];
      const tento = position[1];
      this.phanxuongcc = "";
      this.tocc = tento;

      const response = await this.$axios.get(
        `/api/congnhan/baocaotonghoptheoto?mato=${mato}&tungay=${this.startDate}&denngay=${this.endDate}`
      );
      // console.log(response.data);
      this.dataChamcong = response.data;
    },

    async getBCVP(e) {
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name);
      const response = await this.$axios.get(
        `/api/congnhan/baocaotonghoptheophanxuong?mapx=${name}&tungay=${this.startDate}&denngay=${this.endDate}`
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
