<template>
  <div class="box" style="margin: 10px">
    <div class="columns">
      <div class="column is-11">
        <div class="control">
          <span class="icon is-small is-left">
            <i style="color: #f14668" class="fa fa-calendar"></i>
          </span>
          Báo cáo quân số hàng ngày
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

    <table class="table is-responsive is-bordered is-narrow">
      <tr>
        <td colspan="3" style="text-align: center; font-weight: bold">
          BÁO CÁO QUÂN SỐ TOÀN CÔNG TY
        </td>
      </tr>
      <tr>
        <td style="width: 45%"></td>
        <td>
          <input
            @blur="baocaoquanso"
            v-model="ngaychamcong"
            type="date"
            class="input is-success is-small"
          />
        </td>
        <td style="width: 45%; text-align: right">
          <button
            v-if="chamcong.length > 0"
            @click="exportExcel"
            class="button is-small is-danger"
          >
            Download Execl
          </button>
        </td>
      </tr>
    </table>

    <div class="table_wrapper">
      <table class="table is-responsive is-bordered is-narrow">
        <tr style="background-color: beige">
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            STT
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 10%;
            "
          >
            Mã phân xưởng
          </td>
          <!-- <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tên phân xưởng
              </td> -->
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 10%;
            "
          >
            Mã tổ
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 7%;
            "
          >
            Tổng người
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 6%;
            "
          >
            Ca 1 + HC
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 6%;
            "
          >
            Ca 2
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 6%;
            "
          >
            Ca 3
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ P
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ M
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ K
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ X
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ L
          </td>
        </tr>
        <tr
          v-for="(item, index) in sortedTableData"
          :key="index + 'hfsajdhfkdsafh'"
          :class="{ highlighted: item === highlightedRow }"
          @click="[highlightRow(item), detail(item)]"
        >
          <td style="font-size: smaller; text-align: center">
            <!-- <input
              type="number"
              v-model="item.sort"
              class="input is-small"
              @blur="sortTable"
            /> -->
            {{ index + 1 }}
          </td>
          <td style="font-size: smaller">{{ item.mapx }}</td>
          <!-- <td style="font-size: smaller">{{ item.tenpx }}</td> -->
          <td style="font-size: smaller">{{ item.mato }}</td>
          <!-- <td style="font-size: smaller">{{ item.tento }}</td> -->
          <td style="font-size: smaller; text-align: center">
            {{ item.tong_nguoi }}
          </td>
          <td style="font-size: smaller; text-align: center">
            {{ item.ca_1 }}
          </td>
          <td style="font-size: smaller; text-align: center">
            {{ item.ca_2 }}
          </td>
          <td style="font-size: smaller; text-align: center">
            {{ item.ca_3 }}
          </td>
          <td style="font-size: smaller; text-align: center">
            {{ item.nghip }}
          </td>
          <td style="font-size: smaller; text-align: center">
            {{ item.nghim }}
          </td>
          <td style="font-size: smaller; text-align: center">
            {{ item.nghik }}
          </td>
          <td style="font-size: smaller; text-align: center">
            {{ item.nghix }}
          </td>
          <td style="font-size: smaller; text-align: center">
            {{ item.nghil }}
          </td>
          <!-- <td style="font-size: smaller; text-align: center">
                <input
                  v-model="item.ghichu"
                  type="text"
                  class="input is-small"
                />
              </td>
              <td style="font-size: smaller; text-align: center">
                <a @click="onUpdateCc(item)"
                  ><span>
                    <i style="color: red" class="fa fa-check-circle"></i> </span
                ></a>
              </td> -->
        </tr>
      </table>

      <table
        v-if="this.detailData.length > 0"
        class="table is-responsive is-bordered is-narrow"
      >
        <tr style="background-color: beige">
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 3%;
            "
          >
            STT
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 10%;
            "
          >
            Chấm công
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 15%;
            "
          >
            Công nhân / Nhân viên
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 15%;
            "
          >
            Phân xưởng
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 15%;
            "
          >
            Tổ
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Ca 1
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Ca 2
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Ca 3
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ P
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ M
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ K
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ X
          </td>
          <td
            style="
              text-align: center;
              font-weight: bold;
              font-size: small;
              width: 5%;
            "
          >
            Nghỉ L
          </td>
          <td style="text-align: center; font-weight: bold; font-size: small">
            Diễn giải
          </td>
          <td style="text-align: center; font-weight: bold; font-size: small">
            Ghi chú
          </td>
        </tr>
        <tr v-for="(item, index) in detailData" :key="index + 'lkkoko'">
          <td style="font-size: small; text-align: center">
            {{ index + 1 }}
          </td>
          <td style="font-size: small">{{ item.chamcong }}</td>
          <td style="font-size: small">{{ item.tencn }}</td>
          <td style="font-size: small">{{ item.mapx }}</td>
          <td style="font-size: small">{{ item.mato }}</td>
          <template>
            <td
              v-if="item.machamcong == 1"
              style="font-size: small; text-align: center"
            >
              {{ item.machamcong }}
            </td>
            <td v-else style="font-size: small; text-align: center"></td>
          </template>
          <template>
            <td
              v-if="item.machamcong == 2"
              style="font-size: small; text-align: center"
            >
              {{ item.machamcong }}
            </td>
            <td v-else style="font-size: small; text-align: center"></td>
          </template>
          <template>
            <td
              v-if="item.machamcong == 3"
              style="font-size: small; text-align: center"
            >
              {{ item.machamcong }}
            </td>
            <td v-else style="font-size: small; text-align: center"></td>
          </template>
          <template>
            <td
              v-if="item.machamcong == 'P'"
              style="font-size: small; text-align: center"
            >
              {{ item.machamcong }}
            </td>
            <td v-else style="font-size: small; text-align: center"></td>
          </template>
          <td
            v-if="item.machamcong == 'M'"
            style="font-size: small; text-align: center"
          >
            {{ item.machamcong }}
          </td>
          <td v-else style="font-size: small; text-align: center"></td>
          <td
            v-if="item.machamcong == 'K'"
            style="font-size: small; text-align: center"
          >
            {{ item.machamcong }}
          </td>
          <td v-else style="font-size: small; text-align: center"></td>
          <td
            v-if="item.machamcong == 'X'"
            style="font-size: small; text-align: center"
          >
            {{ item.machamcong }}
          </td>
          <td v-else style="font-size: small; text-align: center"></td>
          <td
            v-if="item.machamcong == 'L'"
            style="font-size: small; text-align: center"
          >
            {{ item.machamcong }}
          </td>
          <td v-else style="font-size: small; text-align: center"></td>
          <td style="font-size: small">{{ item.diengiai }}</td>
          <td style="font-size: small">{{ item.ghichu }}</td>
        </tr>
        <tr>
          <td
            colspan="2"
            style="font-size: small; font-weight: bold; color: #f14668"
          >
            Tổng làm: {{ tonglam }}
          </td>
          <td style="font-size: small; font-weight: bold; color: #f14668">
            Tổng nghỉ: {{ tongnghi }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
import Swal from "sweetalert2";
export default {
  middleware: "auth",
  data() {
    return {
      phanxuong: [],
      chamcong: [],
      detailData: [],
      ngaychamcong: "",
      isActive: false,
      // hightligh
      highlightedRow: null,
      form: {
        mapx: "",
      },
      tento: "",
      tenpx: "",
      form_data: {
        ngaychamcong: "",
        mapx: "",
        tenpx: "",
        mato: "",
        tento: "",
        tongnguoi: "",
        ca1hc: "",
        ca23: "",
        nghip: "",
        nghim: "",
        nghik: "",
        nghix: "",
        nghil: "",
        tongnghi: "",
        ghichu: "",
        createdAt: "",
        createdBy: this.$auth.$state.user.username,
      },
      tongnghi: 0,
      tonglam: 0,
    };
  },

  computed: {
    sortedTableData() {
      return [...this.chamcong];
    },
  },

  mounted() {
    this.getPhanxuong();
    this.currentDateTime();
  },

  methods: {
    sortTable() {
      this.chamcong.sort((a, b) => a.sort - b.sort);
    },
    // hàm highlight để đánh dấu row nào được chọn
    highlightRow(row) {
      this.highlightedRow = row;
    },
    // Hàm chuyển đổi định dạng ngày
    formatDate(dateString) {
      const dateObj = new Date(dateString);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    },

    currentDateTime() {
      const current = new Date();
      const date =
        current.getFullYear() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getDate();
      const time =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      this.form_data.createdAt = date + " " + time;
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async baocaoquanso() {
      // console.log(this.ngaychamcong);
      this.detailData = [];
      this.chamcong = await this.$axios.$get(
        `/api/congnhan/baocaoquanso?ngaychamcong=${this.ngaychamcong}`
      );
      // console.log(this.chamcong);
      if (this.chamcong.length < 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: "Không có số liệu",
        });
      }
    },
    // xuất execl
    exportExcel() {
      const selectedColumns = this.chamcong.map((item) => {
        return {
          stt: item.sort_order,
          mapx: item.mapx,
          tenpx: item.tenpx,
          mato: item.mato,
          tento: item.tento,
          ngaychamcong: this.formatDate(item.ngaychamcong),
          tong_nguoi: item.tong_nguoi,
          ca_1: item.ca_1,
          ca_2: item.ca_2,
          ca_3: item.ca_3,
          nghip: item.nghip,
          nghim: item.nghim,
          nghik: item.nghik,
          nghix: item.nghix,
          nghil: item.nghil,
        };
      });

      // Tính tổng cho các cột
      // const totalTongnhan = this.report.reduce((sum, item) => {
      //   return sum + item.tongnhan;
      // }, 0);
      // const totalCk1 = this.report.reduce((sum, item) => {
      //   return sum + item.ck1;
      // }, 0);
      // const totalCk2 = this.report.reduce((sum, item) => {
      //   return sum + item.ck2;
      // }, 0);
      // const totalTongck = this.report.reduce((sum, item) => {
      //   return sum + item.chuyenkhoan;
      // }, 0);
      // const totalTm = this.report.reduce((sum, item) => {
      //   return sum + item.tienmat;
      // }, 0);

      const data_export = [...selectedColumns];

      // Thêm dòng tổng vào dữ liệu
      // const data_export = [
      //   ...selectedColumns,
      //   {
      //     hotennv: "Tổng cộng",
      //     tongnhan: formatNumber(totalTongnhan),
      //     ck1: formatNumber(totalCk1),
      //     ck2: formatNumber(totalCk2),
      //     chuyenkhoan: formatNumber(totalTongck),
      //     tienmat: formatNumber(totalTm),
      //     ghichu: "",
      //   },
      // ];

      const columnNames = [
        { header: "STT", key: "stt" },
        { header: "Mã phân xưởng", key: "mapx" },
        { header: "Tên phân xưởng", key: "tenpx" },
        { header: "Mã tổ", key: "mato" },
        { header: "Tên tổ", key: "tento" },
        { header: "Ngày chấm công", key: "ngaychamcong" },
        { header: "Tổng người", key: "tong_nguoi" },
        { header: "Ca 1", key: "ca_1" },
        { header: "Ca 2", key: "ca_2" },
        { header: "Ca 3", key: "ca_3" },
        { header: "Nghỉ P (Phép)", key: "nghip" },
        { header: "Nghỉ M (Ốm)", key: "nghim" },
        { header: "Nghỉ K (Không phép)", key: "nghik" },
        { header: "Nghỉ X (Kế hoạch)", key: "nghix" },
        { header: "Nghỉ L (Lễ)", key: "nghil" },
      ];

      const data = data_export.map((item) => {
        const row = {};
        columnNames.forEach((column) => {
          row[column.header] = item[column.key];
        });
        return row;
      });

      const filenameyc = `baocaoquansotheongay_${this.ngaychamcong}`;
      const worksheet = XLSX.utils.json_to_sheet(data);
      // const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const workbook = {
        Sheets: { [filenameyc]: worksheet },
        SheetNames: [filenameyc],
      };
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const fileName = `${filenameyc}`;
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filenameyc + ".xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    async detail(data) {
      // console.log(data);
      const tongnghi =
        data.nghip + data.nghim + data.nghik + data.nghix + data.nghil;
      this.tongnghi = tongnghi;
      this.tonglam = data.tong_nguoi - tongnghi;
      (this.form_data.ngaychamcong = data.ngaychamcong),
        (this.form_data.mapx = data.mapx),
        (this.form_data.tenpx = data.tenpx),
        (this.form_data.mato = data.mato),
        (this.form_data.tento = data.tento),
        (this.form_data.tongnguoi = data.tong_nguoi),
        (this.form_data.ca1hc = data.ca_1),
        (this.form_data.ca23 = data.ca_2_3),
        (this.form_data.nghip = data.nghip),
        (this.form_data.nghim = data.nghim),
        (this.form_data.nghik = data.nghik),
        (this.form_data.nghix = data.nghix),
        (this.form_data.nghil = data.nghil),
        (this.form_data.tongnghi = tongnghi),
        (this.form_data.ghichu = data.ghichu),
        // console.log(data.ghichu);

        (this.tento = data.tento);
      this.tenpx = data.tenpx;
      if (data.mato === "") {
        this.detailData = await this.$axios.$get(
          `/api/congnhan/detailquansowithdonvi?ngaychamcong=${this.ngaychamcong}&mapx=${data.mapx}`
        );
      } else {
        this.detailData = await this.$axios.$get(
          `/api/congnhan/detailquansowithdonvito?ngaychamcong=${this.ngaychamcong}&mato=${data.mato}`
        );
      }
      // console.log(this.detailData);
    },

    async onUpdateCc(item) {
      // console.log(this.form_data);
      this.form_data.ghichu = item.ghichu;
      const viewData = await this.$axios.$get(
        `/api/congnhan/xemlaibaocaoquanso?ngaychamcong=${this.ngaychamcong}`
      );
      // console.log(viewData);
      const exits = viewData.find(
        (item) =>
          item.ngaychamcong.substring(0, 10) === this.ngaychamcong &&
          item.mapx === this.form_data.mapx
      );
      // console.log(exits);
      if (exits) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: "Ngày chấm công này đã được xác nhận rồi",
        });
      } else {
        const reponse = await this.$axios.$post(
          `/api/congnhan/addchamcongphanxuong`,
          this.form_data
        );
        // console.log(reponse);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "Updated!",
        });
      }
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  overflow-x: auto;
  display: block;
  white-space: nowrap;
  position: sticky;
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

.highlighted {
  background-color: lightblue;
}
</style>
