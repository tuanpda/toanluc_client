<template>
  <div class="column" style="margin-left: 20px; margin-right: 20px">
    <br />
    <div class="box">
      <div class="columns" style="border: 1px solid green">
        <div class="column is-7">
          <span style="color: #f14668" class="icon is-small is-left">
            <i class="far fa-calendar-alt"></i>
          </span>
          <span style="font-weight: bold">Chọn kỳ lương văn phòng</span>
          <table
            style="margin-top: 8px"
            class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
          >
            <tr>
              <td style="font-size: small; width: 45%">Tháng lập bảng lương</td>
              <td>
                <!-- <input v-model="thang" type="text" class="input is-small" /> -->
                <div class="select is-small is-fullwidth">
                  <select id="" @change="onChange_Thang($event)">
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
              </td>
            </tr>
            <tr>
              <td style="font-size: small">Năm lập</td>
              <td>
                <!-- <input v-model="nam" type="text" class="input is-small" />
                 -->
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
              </td>
            </tr>
            <tr>
              <td>
                <button
                  @click="[reportBangluong(), reportSum()]"
                  class="button is-small is-success is-fullwidth"
                >
                  <span class="icon is-small">
                    <i class="fas fa-file-alt"></i>
                  </span>
                  <span>Xem bảng lương</span>
                </button>
              </td>
              <td>
                <div class="columns">
                  <div class="column">
                    <button
                      @click="pritnPdf"
                      class="button is-small is-info is-fullwidth"
                    >
                      <span class="icon is-small">
                        <i class="far fa-file-pdf"></i>
                      </span>
                      <span>In PDF</span>
                    </button>
                  </div>
                  <div class="column">
                    <vue-excel-xlsx
                      :data="report"
                      :columns="columns_luong"
                      :file-name="'Lương thang'"
                      :file-type="'xlsx'"
                      :sheet-name="'Lương thang'"
                      style="width: 100%"
                    >
                      Download Execl
                    </vue-excel-xlsx>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="report.length > 0" class="columns" style="margin-top: 1px">
        <div class="table_wrapper">
          <table
            class="table is-responsive is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <tr style="">
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                STT
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Họ tên
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Phòng
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương trách <br />
                nhiệm
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ngày công
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương ngày <br />
                công
              </td>
              <td
                colspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Thưởng doanh thu
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                &nbsp; &nbsp; Phạt &nbsp; &nbsp;
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương ngoài giờ
                <br />
                / Chủ nhật
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                &nbsp; &nbsp; Hỗ trợ &nbsp; &nbsp;
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng lương
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương CB
              </td>
              <td
                colspan="3"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Các khoản khấu trừ
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương nhận
              </td>
            </tr>
            <tr style="">
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                &nbsp; &nbsp; Điều chỉnh &nbsp; &nbsp;
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                &nbsp; &nbsp; Thưởng &nbsp; &nbsp;
              </td>

              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                BHXH
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Công đoàn
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng KT
              </td>
            </tr>
            <tr v-for="(nv, index) in report" :key="index">
              <td style="text-align: center; font-size: small">
                {{ index + 1 }}
              </td>
              <td style="font-size: small">{{ nv.hotennv }}</td>
              <td style="font-size: small">
                {{ nv.tenpb }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.luongtrachnhiem | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.ngaycong }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.luongngaycong | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.dieuchinhdt | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.thuongdt | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.phat | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.luongngoaigio | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.hotro | formatNumber }}
              </td>
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  color: #f14668;
                "
              >
                {{ nv.tongluong | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.mucluong | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.bhxh | formatNumber }}
              </td>

              <td style="text-align: center; font-size: small">
                {{ nv.congdoan | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.tongkt | formatNumber }}
              </td>
              <td
                style="
                  text-align: right;
                  font-size: small;
                  font-weight: bold;
                  color: #f14668;
                "
              >
                {{ nv.luongnhan | formatNumber }}
              </td>
            </tr>
            <tr>
              <td colspan="3"></td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_luongtrachnhiem | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_ngaycong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_luongngaycong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_dieuchinhdt | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_thuongdt | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_phat | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_luongngoaigio | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_hotro | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_tongluong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_mucluong | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_bhxh | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_congdoan | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_tongkt | formatNumber }}
              </td>
              <td
                style="
                  color: red;
                  font-size: small;
                  font-weight: bold;
                  text-align: center;
                "
              >
                {{ sumrp.sum_luongnhan | formatNumber }}
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
import jsPDF from "jspdf";
import "jspdf-autotable";
import "~/assets/font/OpenSans-Light-normal";
import "~/assets/font/OpenSans-SemiBold-normal";
export default {
  middleware: "auth",
  data() {
    return {
      phanxuong: [],
      tonhom: [],
      report: [],
      sumreport: [],
      sumrp: [],
      thang: null,
      nam: null,
      isPdf: false,
      maxuong: "",
      mato: "",
      tenxuong: "",
      tento: "",

      columns_luong: [
        {
          label: "Mã nhân viên",
          field: "manv",
        },
        {
          label: "Tên NV",
          field: "hotennv",
        },
        {
          label: "Phòng ban",
          field: "tenpb",
        },
        {
          label: "Lương trách nhiệm",
          field: "luongtrachnhiem",
        },
        {
          label: "Ngày công",
          field: "ngaycong",
        },
        {
          label: "Lương ngày công",
          field: "luongngaycong",
        },
        {
          label: "Điều chỉnh doanh thu",
          field: "dieuchinhdt",
        },
        {
          label: "Thưởng doanh thu",
          field: "thuongdt",
        },
        {
          label: "Phạt",
          field: "phat",
        },
        {
          label: "Lương ngoài giờ",
          field: "luongngoaigio",
        },
        {
          label: "Hỗ trợ",
          field: "hotro",
        },
        {
          label: "Tổng lương",
          field: "tongluong",
        },
        {
          label: "BHXH",
          field: "bhxh",
        },
        {
          label: "Công đoàn",
          field: "congdoan",
        },
        {
          label: "Tổng trừ",
          field: "tongkt",
        },
        {
          label: "Tổng nhận",
          field: "luongnhan",
        },
      ],
    };
  },

  computed: {
    isDisabled() {
      return this.isPdf == false;
    },

    // sum lương cb
    subRow_luongcb() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.luongcb),
        0
      );
    },
    // sum lương mềm
    subRow_luongmem() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.luongmem),
        0
      );
    },
    // sum số ngày công
    subRow_songaycong() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.songaycong),
        0
      );
    },
    // sum lương công đoạn
    subRow_luongcongdoan() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.luongcd),
        0
      );
    },
    // sum lương công nhật
    subRow_luongcongnhat() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.luongps),
        0
      );
    },
    // sum ngày hỗ trợ
    subRow_ngayhotro() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.ngayhotro),
        0
      );
    },
    // sum tiền hỗ trợ
    subRow_tienhotro() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.tienhotro),
        0
      );
    },
    // sum ăn trưa
    subRow_antrua() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.antrua),
        0
      );
    },
    // sum tổng lương
    subRow_tongluong() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.tongluong),
        0
      );
    },
    // sum bhxh
    subRow_tongbhxh() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.bhxh),
        0
      );
    },
    // sum phat
    subRow_tongphat() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.tienphat),
        0
      );
    },
    // sum congdoan
    subRow_tongcongdoan() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.congdoan),
        0
      );
    },
    // sum tongtru
    subRow_tongtru() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.tongtru),
        0
      );
    },
    // sum tong nhan
    subRow_tongnhan() {
      return this.report.reduce(
        (total, item) => total + parseFloat(item.tongnhan),
        0
      );
    },
  },

  mounted() {
    this.currentDateTime();
    this.getPhanxuong();
  },

  methods: {
    async getPhanxuong() {
      this.phanxuong = await this.$axios.$get(`/api/phongban/allphanxuong`);
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
      // load dữ liệu lương
    },

    async reportBangluong() {
      this.report = await this.$axios.$get(
        `/api/report/reportluongthangvanphong?thang=${this.thang}&nam=${this.nam}`
      );
      // console.log(this.report);
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
          title: "Không có số liệu kỳ lương này",
        });
      }
    },

    async reportSum() {
      this.sumreport = await this.$axios.$get(
        `/api/report/reportsumluongvanphong?thang=${this.thang}&nam=${this.nam}`
      );
      this.sumrp = this.sumreport[0];
      // console.log(this.sumrp)
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
    },

    pritnPdf() {
      const columns = [
        { title: "STT", dataKey: "stt" },
        { title: "Họ tên", dataKey: "hotennv" },
        { title: "Lương công đoạn", dataKey: "luongcd" },
        { title: "Lương công nhật", dataKey: "luongps" },
      ];

      const rows = this.report;

      const doc = new jsPDF({
        orientation: "l",
        format: "a4",
      });

      doc.addFont("OpenSans-Light-normal.ttf", "OpenSans-Light", "normal");
      doc.setFont("OpenSans-Light");
      doc.setFontSize(12);
      doc.setFont("OpenSans-SemiBold");
      doc.setFontSize(13);
      doc.text("TOÀN LỰC JSC", 17, 19);
      doc.addFont("OpenSans-Light-normal.ttf", "OpenSans-Light", "normal");
      doc.setFont("OpenSans-Light");
      doc.setFontSize(12);
      doc.text("CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", 200, 13);
      doc.text("Độc lập - Tự do - Hạnh phúc", 212, 19);

      doc.addFont(
        "OpenSans-SemiBold-normal.ttf",
        "OpenSans-SemiBold",
        "normal"
      );
      doc.setFont("OpenSans-SemiBold");
      doc.setFontSize(14);
      doc.text(
        "BẢNG THANH TOÁN TIỀN LƯƠNG VÀ CÁC KHOẢN KHẤU TRỪ THEO LƯƠNG",
        50,
        32
      );
      doc.text(`Tháng: ${this.thang} Năm: ${this.nam}`, 120, 38);
      doc.setFontSize(12);

      doc.autoTable(columns, rows, {
        startY: doc.lastAutoTable + 45, // Giúp cho trang 2 không bị lặp lại phần add text phía trên
        styles: { font: "OpenSans-Light" | "Unicode" },
        theme: "grid",
        //margin: { top: 110 }, không dùng margin vì sẽ apply all page, như vậy không đúng
        headerStyles: {
          fillColor: [246, 248, 255],
          textColor: 20,
          fontStyle: "bold", // normal, bold, italic, bolditalic
          lineColor: 200,
          lineWidth: 0.1,
          halign: "center", // left, center, right
          valign: "top", // top, middle, bottom
        },
        drawHeaderCell: function (cell, data) {
          if (cell.raw === "ID") {
            //paint.Name header red
            cell.styles.fontSize = 15;
            cell.styles.textColor = [255, 0, 0];
          } else {
            cell.styles.textColor = 255;
            cell.styles.fontSize = 10;
          }
        },
        willDrawCell: (data) => {
          if (data.column.dataKey === "soluong") {
            data.cell.styles.halign = "center";
          }
        },
      });

      doc.output("dataurlnewwindow");
      this.isPdf = false;
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
  height: 750px;
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
