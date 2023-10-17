<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="far fa-calendar-alt"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Báo cáo Chi trả lương văn phòng</span
              >
            </div>
          </div>
        </div>
        <div class="box">
          <div class="columns">
            <div class="column is-3">
              <div class="select is-small is-fullwidth">
                <select @change="onChange_Thang($event)">
                  <option selected>-- Chọn tháng --</option>
                  <option value="01">Tháng 1</option>
                  <option value="02">Tháng 2</option>
                  <option value="03">Tháng 3</option>
                  <option value="04">Tháng 4</option>
                  <option value="05">Tháng 5</option>
                  <option value="06">Tháng 6</option>
                  <option value="07">Tháng 7</option>
                  <option value="08">Tháng 8</option>
                  <option value="09">Tháng 9</option>
                  <option value="10">Tháng 10</option>
                  <option value="11">Tháng 11</option>
                  <option value="12">Tháng 12</option>
                </select>
              </div>
            </div>
            <div class="column is-3">
              <div class="select is-small is-fullwidth">
                <select id="" @change="onChange_Nam($event)">
                  <option selected>-- Chọn năm --</option>
                  <option value="2022">Tháng 2022</option>
                  <option value="2023">Tháng 2023</option>
                  <option value="2024">Tháng 2024</option>
                  <option value="2025">Tháng 2025</option>
                  <option value="2026">Tháng 2026</option>
                  <option value="2027">Tháng 2027</option>
                  <option value="2028">Tháng 2028</option>
                  <option value="2029">Tháng 2029</option>
                  <option value="2030">Tháng 2030</option>
                  <option value="2031">Tháng 2031</option>
                  <option value="2032">Tháng 2032</option>
                  <option value="2033">Tháng 2033</option>
                </select>
              </div>
            </div>
            <div class="column is-3">
              <button
                @click="reportBangluong()"
                class="button is-small is-success is-fullwidth"
              >
                <span class="icon is-small">
                  <i class="fas fa-file-alt"></i>
                </span>
                <span>Xem dữ liệu chi trả</span>
              </button>
            </div>
            <div class="column is-3">
              <button
                @click="exportExcel"
                class="button is-small is-info is-fullwidth"
              >
                Xuất Execl
              </button>
            </div>
          </div>

          <div class="columns">
            <div class="column is-3"></div>
            <div class="column is-3">
              <div class="select is-small is-fullwidth">
                <select
                  :disabled="isDisabled_toxuong"
                  id=""
                  @change="onChangeVanphong($event)"
                >
                  <option disabled selected>-- Chọn Loại văn phòng --</option>
                  <option value="VPBP">Văn phòng bộ phận</option>
                  <option value="VPGT1">Văn phòng gián tiếp 1</option>
                  <option value="VPGT2">Văn phòng gián tiếp 2</option>
                </select>
              </div>
            </div>
            <div class="column is-3">
              <label class="checkbox">
                <input type="checkbox" v-model="alltoxuong" />
                Lương toàn bộ văn phòng
              </label>
            </div>
          </div>
        </div>

        <div v-if="report.length > 0" class="table_wrapper">
          <table
            class="table is-responsive is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <tr style="background-color: blanchedalmond">
              <!-- <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 1%;
                "
              >
                <input type="checkbox" v-model="selectAll" />
              </td> -->
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
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Họ tên
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương nhận
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Chuyển khoản 1
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Chuyển khoản 2
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng chuyển khoản
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 10%;
                "
              >
                Tiền mặt
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Số tài khoản
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tên ngân hàng
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Chủ tài khoản
              </td>
              <td
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 30%;
                "
              >
                Ghi chú
              </td>
            </tr>
            <tr v-for="(nv, index) in report" :key="index">
              <!-- <td style="text-align: center">
                <input v-model="selected" :value="nv" type="checkbox" />
              </td> -->
              <td style="text-align: center; font-size: small">
                {{ index + 1 }}
              </td>
              <td style="font-size: small">{{ nv.hotennv }}</td>
              <td
                style="
                  text-align: right;
                  font-size: small;
                  color: #f14668;
                  font-weight: bold;
                "
              >
                {{ nv.tongnhan | formatNumber }}
              </td>
              <!-- chuyển khoản -->
              <td style="text-align: right; font-size: small">
                {{ nv.ck1 | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.ck2 | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.chuyenkhoan | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.tienmat | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.stk }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.tennganhang }}
              </td>
              <td style="font-size: small; font-weight: 700">
                {{ nv.chutaikhoan }}
              </td>

              <td>
                <input type="text" class="input is-small" v-model="nv.ghichu" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import XLSX from "xlsx";
export default {
  middleware: "auth-luong",
  data() {
    return {
      phanxuong: [],
      tonhom: [],
      report: [],
      thang: null,
      nam: null,
      maxuong: "",
      mato: "",
      tenxuong: "",
      tento: "",
      khoi: "",
      alltoxuong: false,
    };
  },

  computed: {
    isDisabled_toxuong() {
      return this.alltoxuong == true;
    },
  },

  mounted() {
    this.getPhanxuong();
    this.currentDateTime();
  },

  methods: {
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
    },

    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
    },

    async getWithPX(e) {
      this.mato = "";
      this.maxuong = "";
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.maxuong = p1;
      this.tenxuong = p2;
      this.tonhom = await this.$axios.$get(
        `/api/phongban/alltoinxuong?mapx=${p1}`
      );
    },

    async getWithTo(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.mato = p1;
      this.tento = p2;
    },

    onChange_Thang(e) {
      var id = e.target.value;
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ', id);
      // console.log('name ',name );
      this.thang = id;
      // console.log(this.nam)
      // console.log(this.tennam)
    },

    onChange_Nam(e) {
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      this.nam = id;
      // console.log(this.nam)
      // console.log(this.tennam)
    },

    onChangeVanphong(e) {
      var id = e.target.value;
      // var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log('id ',id );
      // console.log('name ',name );
      this.khoi = id;
      // console.log(this.nam)
      // console.log(this.tennam)
      // load dữ liệu lương
    },

    // load report
    async reportBangluong() {
      if (this.alltoxuong == true) {
        this.report = [];
        this.report = await this.$axios.$get(
          `/api/report/reportchitraluongthangallvp?thang=${this.thang}&nam=${this.nam}`
        );
        if (this.report.length <= 0) {
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
            title: "Không có số liệu kỳ lương tại xưởng này",
          });
        }
      } else {
        this.report = await this.$axios.$get(
          `/api/report/reportchitraluongthang_khoi?thang=${this.thang}&nam=${this.nam}&makhoi=${this.khoi}`
        );
        if (this.report.length <= 0) {
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
            title: "Không có số liệu kỳ lương tại khối này",
          });
        }
      }
    },

    // xuất execl
    exportExcel() {
      // Hàm định dạng số với dấu ngăn cách thập phân
      function formatNumber(number) {
        const parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
      let filename_phanxuong;
      if (this.alltoxuong == true) {
        filename_phanxuong = "Tất cả phân xưởng";
      } else {
        filename_phanxuong = this.maxuong + "_" + this.mato;
      }
      const selectedColumns = this.report.map((item) => {
        // const formattedDate = new Date(item.ngaybd).toLocaleDateString("en-GB");
        const tongnhan = parseFloat(item.tongnhan); // Chuyển đổi giá trị thành số
        const ck1 = parseFloat(item.ck2);
        const ck2 = parseFloat(item.ck1);
        const chuyenkhoan = parseFloat(item.chuyenkhoan);
        const tienmat = parseFloat(item.tienmat);
        return {
          hotennv: item.hotennv,
          tongnhan: isNaN(tongnhan) ? item.tongnhan : formatNumber(tongnhan),
          // Định dạng nếu là số, ngược lại giữ nguyên giá trị
          ck1: isNaN(ck1) ? item.ck1 : formatNumber(ck1),
          ck2: isNaN(ck2) ? item.ck2 : formatNumber(ck2),
          chuyenkhoan: isNaN(chuyenkhoan)
            ? item.chuyenkhoan
            : formatNumber(chuyenkhoan),
          tienmat: isNaN(tienmat) ? item.tienmat : formatNumber(tienmat),
          stk: item.stk,
          tennganhang: item.tennganhang,
          chutaikhoan: item.chutaikhoan,
          ghichu: item.ghichu,
        };
      });

      // Tính tổng cho các cột
      const totalTongnhan = this.report.reduce((sum, item) => {
        return sum + item.tongnhan;
      }, 0);
      const totalCk1 = this.report.reduce((sum, item) => {
        return sum + item.ck1;
      }, 0);
      const totalCk2 = this.report.reduce((sum, item) => {
        return sum + item.ck2;
      }, 0);
      const totalTongck = this.report.reduce((sum, item) => {
        return sum + item.chuyenkhoan;
      }, 0);
      const totalTm = this.report.reduce((sum, item) => {
        return sum + item.tienmat;
      }, 0);

      // Thêm dòng tổng vào dữ liệu
      const data_export = [
        ...selectedColumns,
        {
          hotennv: "Tổng cộng",
          tongnhan: formatNumber(totalTongnhan),
          ck1: formatNumber(totalCk1),
          ck2: formatNumber(totalCk2),
          chuyenkhoan: formatNumber(totalTongck),
          tienmat: formatNumber(totalTm),
          ghichu: "",
        },
      ];
      const columnNames = [
        { header: "Họ tên", key: "hotennv" },
        { header: "Tổng nhận", key: "tongnhan" },
        { header: "Chuyển khoản lần 1", key: "ck1" },
        { header: "Chuyển khoản lần 2", key: "ck2" },
        { header: "Tổng chuyển khoản", key: "chuyenkhoan" },
        { header: "Tiền mặt", key: "tienmat" },
        { header: "Số tài khoản", key: "stk" },
        { header: "Tên ngân hàng", key: "tennganhang" },
        { header: "Chủ tài khoản", key: "chutaikhoan" },
        { header: "Ghi chú", key: "ghichu" },
      ];
      const data = data_export.map((item) => {
        const row = {};
        columnNames.forEach((column) => {
          row[column.header] = item[column.key];
        });
        return row;
      });

      const filenameyc = filename_phanxuong + "_" + this.thang + "_" + this.nam;
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
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height {
  height: 200px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

@media (max-width: 1200px) {
  .table_wrapper {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    position: sticky;
    left: 0;
    background-color: whitesmoke;
  }

  .input.is-small {
    width: 100%;
    min-width: 150px;
  }

  .modal-card {
    width: 1320px;
    height: 800px;
  }
}
</style>
