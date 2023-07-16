<template>
  <div class="column" style="margin-left: 5px; margin-right: 5px">
    <br />
    <div class="box">
      <div class="columns" style="border: 1px solid green">
        <div class="column is-7">
          <span style="color: #f14668" class="icon is-small is-left">
            <i class="far fa-calendar-alt"></i>
          </span>
          <span style="color: #3850b7; font-size: 14px; font-weight: bold"
            >Chi trả lương</span
          >
          <table
            style="margin-top: 8px"
            class="table table is-bordered table is-narrow table is-hoverable table is-fullwidth"
          >
            <tr>
              <td style="font-size: small; width: 45%">Tháng lập bảng lương</td>
              <td>
                <input v-model="thang" type="text" class="input is-small" />
              </td>
            </tr>
            <tr>
              <td style="font-size: small">Năm lập</td>
              <td>
                <input v-model="nam" type="text" class="input is-small" />
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
                  @click="onSaveChitra"
                  class="button is-small is-info is-fullwidth"
                >
                  <span class="icon is-small">
                    <i class="far fa-file-pdf"></i>
                  </span>
                  <span>Chi trả</span>
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
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 1%;
                "
              >
                <input type="checkbox" v-model="selectAll" />
              </td>
              <td
                rowspan="2"
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
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  width: 12%;
                "
              >
                Họ tên
              </td>
              <!-- <td
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
              </td> -->

              <!-- <td
                colspan="2"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Hỗ trợ
              </td> -->
              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: antiquewhite;
                  width: 7%;
                "
              >
                Tổng lương
              </td>
              <!-- <td
                colspan="5"
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Các khoản khấu trừ
              </td> -->
              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: azure;
                  width: 7%;
                "
              >
                Tổng trừ
              </td>
              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: aliceblue;
                  width: 7%;
                "
              >
                Lương nhận
              </td>
              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: aliceblue;
                  width: 7%;
                "
              >
                Lần 1
              </td>
              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: aliceblue;
                  width: 7%;
                "
              >
                Lần 2
              </td>
              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: aliceblue;
                  width: 7%;
                "
              >
                Lần 3
              </td>
              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: aliceblue;
                  width: 10%;
                "
              >
                Số tài khoản
              </td>

              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: aliceblue;
                  width: 7%;
                "
              >
                Chuyển khoản
              </td>
              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: aliceblue;
                  width: 7%;
                "
              >
                Tiền mặt
              </td>
              <td
                rowspan="2"
                style="
                  text-align: center;
                  font-weight: bold;
                  font-size: small;
                  background-color: aliceblue;
                  width: 7%;
                "
              >
                Còn lại
              </td>
              <td></td>
            </tr>
            <tr>
              <!-- rowspan hỗ trợ -->
              <!-- <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Ngày
              </td>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Thành tiền
              </td> -->
              <!-- rowspan các khoản khấu trừ -->
              <!-- <td
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
              </td> -->
            </tr>
            <tr v-for="(nv, index) in report" :key="index">
              <td style="text-align: center">
                <input v-model="selected" :value="nv" type="checkbox" />
              </td>
              <td style="text-align: center; font-size: small">
                {{ index + 1 }}
              </td>
              <td style="font-size: small">{{ nv.hotennv }}</td>
              <!-- <td style="text-align: right; font-size: small">
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
              </td> -->
              <!-- <td style="text-align: right; font-size: small">
                {{ nv.ngayhotro }}
              </td>
              <td style="text-align: right; font-size: small">
                {{ nv.tienhotro | formatNumber }}
              </td> -->
              <td
                style="
                  text-align: right;
                  font-size: small;
                  color: #f14668;
                  font-weight: bold;
                "
              >
                {{ nv.tongluong | formatNumber }}
              </td>
              <!-- <td style="text-align: right; font-size: small">
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
              </td> -->
              <td style="text-align: right; font-size: small">
                {{ nv.tongtru | formatNumber }}
              </td>
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
              <td style="text-align: center; font-size: small">
                {{ nv.nhanl1 | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.nhanl2 | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.nhanl3 | formatNumber }}
              </td>
              <td style="text-align: center; font-size: small">
                {{ nv.stk }}
              </td>
              <!-- gõ tiền chuyển khoản -->
              <template
                v-if="
                  nv.tongnhan -
                    (parseFloat(nv.nhanl1) +
                      parseFloat(nv.nhanl2) +
                      parseFloat(nv.nhanl3)) ==
                  0
                "
              >
                <td style="text-align: center; font-size: small">
                  <input
                    v-model="nv.chuyenkhoan"
                    class="input is-small"
                    type="text"
                    v-mask="mask"
                    disabled
                  />
                </td>
              </template>
              <template v-else>
                <td style="text-align: center; font-size: small">
                  <input
                    v-model="nv.chuyenkhoan"
                    class="input is-small"
                    type="text"
                    v-mask="mask"
                  />
                </td>
              </template>

              <!-- gõ tiền mặt -->
              <template
                v-if="
                  nv.tongnhan -
                    (parseFloat(nv.nhanl1) +
                      parseFloat(nv.nhanl2) +
                      parseFloat(nv.nhanl3)) ==
                  0
                "
              >
                <td style="text-align: center; font-size: small">
                  <input
                    v-mask="mask"
                    v-model="nv.tienmat"
                    type="text"
                    class="input is-small"
                    disabled
                  />
                </td>
              </template>
              <template v-else>
                <td style="text-align: center; font-size: small">
                  <input
                    v-mask="mask"
                    v-model="nv.tienmat"
                    type="text"
                    class="input is-small"
                  />
                </td>
              </template>

              <!-- còn lại -->
              <td
                style="
                  text-align: center;
                  font-size: small;
                  font-weight: bold;
                  color: red;
                "
              >
                {{
                  (nv.tongnhan -
                    (parseFloat(nv.nhanl1) +
                      parseFloat(nv.nhanl2) +
                      parseFloat(nv.nhanl3)))
                    | formatNumber
                }}
              </td>
              <td></td>
            </tr>
            <tr>
              <td
                style="text-align: center; font-weight: bold; font-size: small"
              >
                Tổng
              </td>
              <td></td>
              <!-- <td
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
              </td> -->
              <td
                style="text-align: right; font-weight: bold; font-size: small"
              >
                {{ sumrp.sum_tongluong | formatNumber }}
              </td>
              <!-- <td
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
              </td> -->
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
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "~/assets/font/OpenSans-Light-normal";
import "~/assets/font/OpenSans-SemiBold-normal";
export default {
  middleware: "auth-admin",
  data() {
    return {
      selected: [],
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
      mask: currencyMask,
      form: {
        chuyenkhoan: 0,
        tienmat: 0,
      },
    };
  },

  computed: {
    selectAll: {
      get: function () {
        return this.report ? this.selected.length == this.report.length : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.report.forEach(function (nv) {
            selected.push(nv);
          });
        }

        this.selected = selected;
      },
    },

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

    async onSaveChitra() {
      // console.log(this.selected);
      for (let i = 0; i < this.selected.length; i++) {
        // console.log(this.selected[i].chuyenkhoan.replace(/,/g, ""));
        // console.log(this.selected[i].tienmat.replace(/,/g, ""));
        if (this.selected[i].nhanl1 == 0) {
          if (this.selected[i].tienmat == 0) {
            this.selected[i].nhanl1 = this.selected[i].chuyenkhoan.replace(
              /,/g,
              ""
            );
          } else {
            this.selected[i].nhanl1 = this.selected[i].tienmat.replace(
              /,/g,
              ""
            );
          }
          await this.$axios.patch(
            `/api/ketoan/addchitraluongthang/${this.selected[i]._id}`,
            this.selected[i]
          );
        } else if (this.selected[i].nhanl2 == 0) {
          if (this.selected[i].tienmat == 0) {
            this.selected[i].nhanl2 = this.selected[i].chuyenkhoan.replace(
              /,/g,
              ""
            );
          } else {
            this.selected[i].nhanl2 = this.selected[i].tienmat.replace(
              /,/g,
              ""
            );
          }
          await this.$axios.patch(
            `/api/ketoan/addchitraluongthang/${this.selected[i]._id}`,
            this.selected[i]
          );
        } else if (this.selected[i].nhanl3 == 0) {
          if (this.selected[i].tienmat == 0) {
            this.selected[i].nhanl3 = this.selected[i].chuyenkhoan.replace(
              /,/g,
              ""
            );
          } else {
            this.selected[i].nhanl3 = this.selected[i].tienmat.replace(
              /,/g,
              ""
            );
          }
          await this.$axios.patch(
            `/api/ketoan/addchitraluongthang/${this.selected[i]._id}`,
            this.selected[i]
          );
        }
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
