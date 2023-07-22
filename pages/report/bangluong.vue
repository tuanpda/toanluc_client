<template>
  <div class="column" style="margin-left: 20px; margin-right: 20px">
    <br />
    <div class="box">
      <div class="columns" style="border: 1px solid green">
        <div class="column is-7">
          <span style="color: #f14668" class="icon is-small is-left">
            <i class="far fa-calendar-alt"></i>
          </span>
          <span style="font-weight: bold">Chọn kỳ lương tại phân xưởng</span>
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
              <td style="font-size: small">
                <div class="control has-icons-left">
                  <div class="select is-small is-fullwidth">
                    <select @change="getWithPX($event)">
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
              </td>
              <td>
                <div class="control has-icons-left">
                  <div class="select is-small is-fullwidth">
                    <select @change="getWithTo($event)">
                      <option selected>-- Chọn tổ --</option>
                      <option v-for="item in tonhom" :value="item.mapx">
                        {{ item.mato }} -- {{ item.tento }}
                      </option>
                    </select>
                  </div>
                  <span class="icon is-small is-left">
                    <i style="color: #48c78e" class="fas fa-kaaba"></i>
                  </span>
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
                <button
                  @click="pritnPdf"
                  class="button is-small is-info is-fullwidth"
                >
                  <span class="icon is-small">
                    <i class="far fa-file-pdf"></i>
                  </span>
                  <span>In PDF</span>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="report.length > 0" class="columns" style="margin-top: 1px">
        <div class="table_wrapper table-height">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <tr>
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
                Lương CB
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương mềm
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
                Lương QLSP
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương công đoạn
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Lương công nhật
              </td>
              <td
                rowspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng lương
              </td>
              <td
                colspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Hỗ trợ
              </td>
              <td
                colspan="5"
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
            <tr>
              <!-- rowspan hỗ trợ -->
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ngày
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Thành tiền
              </td>
              <!-- rowspan các khoản khấu trừ -->
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                BHXH
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ăn trưa
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tạm ứng
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                KPCĐ
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
              <td style="text-align: right; font-size: small">
                {{ nv.luongcb | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.luongmem | formatNumber }}
              </td>
              <td
                style="text-align: right; font-size: small; text-align: center"
              >
                {{ nv.songaycong }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.luongqlsp | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.luongcd | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.luongps | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.tongluong | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.ngayhotro }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.tienhotro | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.bhxh | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.antrua | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.tamung | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.congdoan | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.tongtru | formatNumber }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.tongnhan | formatNumber }}
              </td>
            </tr>
            <tr>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng
              </td>
              <td></td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_luongcb | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_luongmem | formatNumber }}
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_ngaycong | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_luongqlsp | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_luongcd | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_luongcn | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_tongluong | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_ngayhotro | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_tienhotro | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_bhxh | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_antrua | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_tamung | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_kpcd | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_tongkt | formatNumber }}
              </td>
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_tongnhan | formatNumber }}
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
  middleware: "auth-admin",
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
    };
  },

  computed: {
    isDisabled() {
      return this.isPdf == false;
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

    async getWithPX(e) {
      this.mato = "";
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

    async reportBangluong() {
      if (this.mato == "") {
        this.report = await this.$axios.$get(
          `/api/report/reportluongthang_px?thang=${this.thang}&nam=${this.nam}&mapb=${this.maxuong}`
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
          `/api/report/reportluongthang_to?thang=${this.thang}&nam=${this.nam}&mato=${this.mato}`
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
            title: "Không có số liệu kỳ lương tại tổ này",
          });
        }
      }
    },

    async reportSum() {
      this.sumreport = await this.$axios.$get(
        `/api/report/reportsumluong?thang=${this.thang}&nam=${this.nam}`
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
